const Discord = require('discord.js');
const mongoose = require('mongoose');
const userData = require('./models/user');

const getTime = function getCurrentTimeInMs() {
	const d = new Date();
	return d.getTime();
};

const convertTime = function convertMsToTimeString(ms) {
	const d = new Date(ms);
	return d.toLocaleString();
};


const checkUser = async function checkUserReminders(user, client) {
	const userId = user.userId;
	let remove = [];

	for (let i = 0; i < user.reminders.length; i++) {
		const currTime = getTime();

		if (currTime >= user.reminders[i].timeDesiredMs) {
			const channelId = user.reminders[i].channelId;
			const date = convertTime(user.reminders[i].timeDesiredMs);
			const period = user.reminders[i].timeRequestedString;

			const channel = await client.channels.fetch(channelId);
			channel.send(`<@${userId}>, The reminder you set at ${date} for ${period} is up!`)

			remove.push(i);
		}
	}

	for (idx in remove.reverse()) {
		c = user.reminders.splice(idx, 1);
		user.save();
	}
};



const checkDb = async function checkDBForUsers(client) {
	const res = await userData.find({}).exec();
	
	if (!res) {
		return;
	}

	for (const user of res) {
		checkUser(user, client)
	}
};


module.exports = {
	'init': (client) => {
		setInterval( () => {
			checkDb(client);
		}, 10000);
	}
};

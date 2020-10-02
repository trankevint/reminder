const mongoose = require('mongoose');
const userData = require('../models/user');
const reminder = require('../models/reminder');


const convertTime = function convertDateToTime(date) {
	return date.getTime();
};


const addTime = function convertStringToTime(time, args) {
	const amountOfTime = args[0];
	const unitOfTime = args[1];

	switch (unitOfTime) {
		case 'M':
			return time + (parseInt(amountOfTime) * 60000);
			break;
		case 'H':
			return time + (parseInt(amountOfTime) * 360000);
			break;
		case 'D':
			return time + (parseInt(amountOfTime) * 86400000);
			break;
	}
};


module.exports = {
	'name': 'set',
	'execute': async (msg, args) => {

		const pattern = /\d+ (M|H|D)/;
		const string = args.join(' ');

		if (!string.match(pattern)) {
			msg.reply('Invalid format for !set command. Please refer to !help.')
			return;
		}

		const newReminder = new reminder({
			channelId: msg.channel.id,
			timeRequestedString: string,
			timeRequestedMs: convertTime(msg.createdAt),
			timeDesiredMs: addTime(convertTime(msg.createdAt), args)
		});
		
		const res = await userData.findOne({userId: msg.author.id}).exec();

		if (!res) {
			const newData = new userData({
				'userId': msg.author.id,
				'reminders': [newReminder]
			})
			newData.save()
			msg.reply(`Reminder set for ${string}!`);
		} else {
			res.reminders.push(newReminder);
			res.save();
			msg.reply(`Reminder added for ${string}!`);
		}
	}
};

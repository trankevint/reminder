const mongoose = require('mongoose');
const userData = require('../models/user');


const convertTime = function convertTimeToDate(time) {
	let d = new Date(time);
	return d.toUTCString();
};


module.exports = {
	'name': 'list',
	'execute': async (msg, args) => {
		if (args.length > 0) {
			msg.reply('Invalid format for !list command. Please refer to !help.');
			return;
		}

		const res = await userData.findOne({userId: msg.author.id}).exec();

		if (!res || res.reminders.length === 0) {
			msg.reply('No reminders to list!');
			return;
		}
		
		data = '\n';

		for (let i = 0; i < res.reminders.length; i++) {
			data += `${i + 1}. Reminder set on ${convertTime(res.reminders[i].timeRequestedMs)} for ${res.reminders[i].timeRequestedString}.`;
			if (i !== res.reminders.length) {
				data += '\n';
			}
		}

		res.save();
		msg.reply(data);
	}
};

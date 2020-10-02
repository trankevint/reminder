const mongoose = require('mongoose');
const userData = require('../models/user');


module.exports = {
	'name': 'clear',
	'execute': async (msg, args) => {
		if (args.length > 0) {
			msg.reply('Invalid format for !clear command. Please refer to !help.');
			return;
		}

		const res = await userData.findOne({userId: msg.author.id}).exec();

		if (!res || res.reminders.length === 0) {
			msg.reply('No reminders to clear!');
			return;
		}

		res.reminders = [];
		res.save();
		msg.reply('Reminders cleared.');
	}
};

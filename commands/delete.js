const mongoose = require('mongoose');
const userData = require('../models/user');


module.exports = {
	'name': 'delete',
	'execute': async (msg, args) => {

		const pattern = /\d+/;
		const string = args.join('');

		if (!string.match(pattern)) {
			msg.reply('Invalid format for !delete command. Please refer to !help.');
			return;
		}
		
		const res = await userData.findOne({userId: msg.author.id}).exec();

		if (!res || res.reminders.length === 0) {
			msg.reply('No reminders found!');
			return;
		}

		if (parseInt(string) === 0 || parseInt(string) > res.reminders.length) {
			msg.reply('Index out of bounds!');
			return;
		}

		res.reminders.splice(parseInt(string) - 1, 1);
		res.save();
		msg.reply(`Reminder ${string} deleted.`);
	}
};

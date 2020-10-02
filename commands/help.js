const {MessageEmbed} = require('discord.js');

module.exports = {
	'name': 'help',
	'execute': (msg) => {
		const embed = new MessageEmbed()
		embed.setTitle('Remind Bot Commands');
		embed.setColor(0x9370DB);
		embed.setDescription('Set a reminder: !set <time> <M|H|D>\nCheck all reminders: !list\nDelete a reminder: !delete <index>\nClear all reminders: !clear');
		msg.reply(embed);
	}
}
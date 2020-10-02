const Discord = require('discord.js');
const mongoose = require('mongoose');
const fs = require('fs');


const client = new Discord.Client();
client.commands = new Discord.Collection();
client.mongoose = require('./mongoose');
client.search = require('./search');


const contents = fs.readFileSync('botconfig.json');
const botConfig = JSON.parse(contents);


const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}


client.on('ready', () => {
	console.log(`Logged in as ${client.user.tag}!`);
	client.search.init(client);
});


client.on('message', (msg) => {

	if (!msg.content.startsWith(botConfig.prefix)) {
		return;
	}

	const content = msg.content.substring(1).split(' ');
	const command = content[0];
	const args = content.slice(1);

	switch (command) {
		case 'set':
			client.commands.get('set').execute(msg, args);
			break;
		case 'list':
			client.commands.get('list').execute(msg, args);
			break;
		case 'delete':
			client.commands.get('delete').execute(msg, args);
			break;
		case 'clear':
			client.commands.get('clear').execute(msg, args);
			break;
		case 'help':
			client.commands.get('help').execute(msg);
			break;
		default:
			msg.reply("Command not found. Please refer to !help.");
	}
});


client.mongoose.init();
client.login(botConfig['discordToken']);

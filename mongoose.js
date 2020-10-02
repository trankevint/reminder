const mongoose = require('mongoose');
const fs = require('fs');

const contents = fs.readFileSync('botconfig.json');
const botConfig = JSON.parse(contents);

module.exports = {
	'init': () => {
		const dbOptions = {
			useNewUrlParser: true,
			useUnifiedTopology: true
		};

		mongoose.connect(botConfig['mongoPass'], dbOptions);
		mongoose.set('useFindAndModify', false);
		mongoose.Promise = global.Promise;

		mongoose.connection.on('connected', () => {
			console.log('Mongoose connection successful.');
		});

		mongoose.connection.on('err', (err) => {
			console.log(`Mongoose connection error: \n${err.stack}`);
		});

		mongoose.connection.on('disconnected', () => {
			console.log('Mongoose connection disconnected.');
		});
	}
};
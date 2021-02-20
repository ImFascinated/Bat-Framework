const Discord = require('discord.js');
const { Client } = require('../dist/index');
require('dotenv').config()

const client = new Discord.Client();
const Bot = new Client(client, {
	commandsDirectory: 'Commands',
	eventsDirectory: 'Events',
	showWarns: true,
	autoSaveInterval: 300000,
	databaseOptions: {
		keepAlive: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}
});
Bot.setMongoPath(process.env.MONGO_URI);
Bot.setDefaultPrefix('?');

Bot.on('databaseConnected', () => {
	console.log('Bot » Database connected!');
});

client.login(process.env.TOKEN);

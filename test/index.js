const { Client, Intents } = require('discord.js');
const { Client: BatClient } = require('../dist/index');
require('dotenv').config()

const client = new Client({ ws: { intents: Intents.ALL } });
const Bot = new BatClient(client, {
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

const { Client } = require('discord.js');
const { BatClient, EventBase } = require('../../dist/index');

module.exports = class ReadyEvent extends EventBase {
    constructor() {
		super({
			event: 'ready',
			type: 'on'
		});
	}
	
	/**
	 * 
	 * @param {BatClient} instance 
	 * @param {Client} client
	 */

	run(instance, client) {
		this.setActivity(client);
		setTimeout(() => {
			this.setActivity(client);
		}, 1000);

		console.log(`Bot » Successfully initialized with ${client.guilds.cache.size} guilds and ${client.users.cache.size} members!`);
	}
	
	setActivity(client) {
		client.user.setActivity(`with ${client.users.cache.size} users in ${client.guilds.cache.size} servers`, { type: 'PLAYING' });
	}
}
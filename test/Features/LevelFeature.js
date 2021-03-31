const { Client } = require('discord.js');
const { BatClient, FeatureBase } = require('../../dist/index');

module.exports = class LevelFeature extends FeatureBase {
	constructor() {
		super();
	}

	/**
	 * @param {BatClient} instance 
	 * @param {Client} client 
	 */

	async init(instance, client) {
		client.on('message', (message) => {
			console.log("msg")
		})
	}
}
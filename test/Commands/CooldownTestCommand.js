const { Message } = require('discord.js');
const { CommandBase } = require('../../dist/index');

module.exports = class MessageEvent extends CommandBase {
	constructor() {
		super({
			name: 'cooldowntest',
			cooldown: 30000 // 30 Seconds
		});
	}

	/**
	 * @param {Message} message 
	 * @param {string[]} args 
	 */

	async run(message, args, guildData) {}
}
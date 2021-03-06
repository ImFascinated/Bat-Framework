const { Message } = require('discord.js');
const { CommandBase } = require('../../dist/index');

module.exports = class MessageEvent extends CommandBase {
	constructor() {
		super({
			name: 'setprefix',
			description: 'Simple set prefix command.',
			aliases: ['prefix'],
			cooldown: 30000,
			clientPermissions: [
				'KICK_MEMBERS'
			],
			userPermissions: [
				'ADMINISTRATOR',
				'KICK_MEMBERS'
			]
		});
	}

	/**
	 * @param {Message} message 
	 * @param {string[]} args 
	 */

	async run(message, args, guildData) {
		if (args.length < 1) {
			// A simple example below on how ro retrieve guild data.
			return message.channel.send(`Your prefix: \`${guildData.getData('prefix')}\``);
		}
		const prefix = args[0];
		// A simple example below is how to set guild data.
		await guildData.setData('prefix', prefix, true).then(data => {
			message.channel.send(`Your guilds prefix has been updated to \`${data.value}\`.`);
		});
	}
}
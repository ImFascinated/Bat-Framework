import { Client, Message, MessageEmbed } from "discord.js";
import BatClient from "../../../Client/BatClient";
import Guild from "../../../Guild/Guild";
import CommandBase from "../../CommandBase";

module.exports = class CommandCommand extends CommandBase {
	constructor() {
		super({
			name: 'command',
			description: 'Command settings',
			category: 'settings',
			userPermissions: [
				'ADMINISTRATOR'
			]
		});
	}

	async run(instance: BatClient, client: Client, message: Message, args: string[], guildData: Guild) {
		const { channel } = message;
		if (args.length < 1) {
			channel.send(new MessageEmbed()
				.setTitle('Command Settings')
				.setDescription(
					"**Command Disabling**\n" +
					"" +
					"__Usage__" +
					`${guildData.prefix}command disable <name>` +
					"" +
					"__Example__" +
					`${guildData.prefix}command disable <help>`
				)
			)
			return;
		}
	}
}
import { Client, Message, MessageEmbed } from 'discord.js';
import BatFramework from '../Client/BatClient';
const { promisify } = require('util');
const glob = promisify(require('glob'));
import ms from 'ms';
import path from 'path';
import CommandBase from './CommandBase';
import Guild from '../Guild/Guild';
import BatClient from '../Client/BatClient';

type Options = {
	directory?: string,
	silentLoad?: boolean,
}

class CommandHandler {
	private _commands: Map<String, CommandBase> = new Map();

	/**
	 * @description Constructs the {CommandHandler} instance
	 * @param {BatClient} instance - The main instance for BatClient.
	 * @param {Client} client - Discord.JS client
	 */

	constructor(instance: BatFramework, client: Client) {
		this.init(instance, client, { directory: instance.commandsDirectory });

		// TODO: Move this to a built-in event.
		client.on('message', async (message: Message) => {
			const { guild, member, author, content, channel } = message
			if (!guild || author.bot) return;
			if (!member) return;

			await instance.guildManager.createGuild(instance, guild.id);

			let guildData: Guild | undefined = instance.guildManager.getGuild(guild.id);
			if (guildData === undefined) {
				await instance.guildManager.createGuild(instance, guild.id);
				guildData = instance.guildManager.getGuild(guild.id);
			}

			if (guildData === undefined) return;
			const prefix = guildData.prefix;
			if (prefix === undefined) return;
			if (!content.startsWith(prefix)) return;

			const [cmd, ...args] = content.slice(prefix.length).trim().split(/ +/g);
			const command: CommandBase | undefined = this.getCommandByName(cmd);
			if (command) {
				// Checking to see if the command is only usable by the bot owners
				if (command.botOwnerOnly) {
					if (!instance.botOwners.includes(member.user.id)) {
						return (await channel.send(
							`You do not own this bot and cannot run this command.\n*This message will be automatically deleted in 5 seconds.*`
						)).delete({ timeout: 5000 })
					} 
				}

				// Checking if command has client permissions, and if it does, check if the client (the bot) has the permission(s)
				if (command.clientPermissions) {
					const missingPermissions: string[] = [];
					command.clientPermissions.forEach(permission => {
						if (!guild.me?.hasPermission(permission)) {
							missingPermissions.push(permission);
						}
					})
					if (missingPermissions.length !== 0) {
						return (await channel.send(
							`I am missing the permission${missingPermissions.length > 1 ? 's' : ''} \`${missingPermissions.join(', ')}\` and cannot run this command.\n*This message will be automatically deleted in 5 seconds.*`
						)).delete({ timeout: 5000 })
					}
				}

				// Checking if command has user permissions, and if it does, it checks to see if the user has the permission(s)
				if (command.userPermissions) {
					const missingPermissions: string[] = [];
					command.userPermissions.forEach(permission => {
						if (!member?.hasPermission(permission)) {
							missingPermissions.push(permission);
						}
					})
					if (missingPermissions.length !== 0) {
						return (await channel.send(
							`You are missing the permission${missingPermissions.length > 1 ? 's' : ''} \`${missingPermissions.join(', ')}\` and cannot use this command.\n*This message will be automatically deleted in 5 seconds.*`
						)).delete({ timeout: 5000 })
					}
				}

				if (command.cooldown) {
					if (command.cooldown <= 0) return;
					const left: number = command.getUserCooldown(guild.id, member.id);
					if (left <= 0) {
						command.setUserCooldown(guild.id, member.id);
					}
					if (left > 0) {
						return (await channel.send(
							`You are still on command cooldown for **${ms(left, { long: true })}**.\n*This message will be automatically deleted in 5 seconds.*`
						)).delete({ timeout: 5000 })
					}
				}
				await command.run(instance, client, message, args, guildData);
			}
		});
	}

	/**
	 * @description Initializes the commands, gets them ready within the {Client} and stores them into the _commands Map
	 * @param {BatClient} instance - The main instance for BatClient.
	 * @param {Client} client - Discord.JS client
	 * @param {Options} options - The {Options} passed into the method
	 * @private
	 */

	private async init(instance: BatFramework, client: Client, options: Options) {
		let {
			directory,
			silentLoad = false
		} = options

		await this.loadCommands(instance, client, directory, silentLoad);
		await this.loadCommands(instance, client, `${__dirname}${path.sep}Commands`, true);
	}

	/**
	 * @description Finds the {CommandBase} that has the provided name
	 * @param {string} name - Provided name
	 * @returns CommandBase
	 */

	public getCommandByName(name: string): CommandBase | undefined {
		let toReturn: CommandBase | undefined = undefined;
		this._commands.forEach(command => {
			if (toReturn) return toReturn;
			if (command.name === name) toReturn = command;
			if (command.aliases) {
				command.aliases.forEach(alias => {
					if (alias === name) toReturn = command;
				});
			}
		});
		return toReturn;
	}

	public async loadCommands(instance: BatClient, client: Client, directory: string | undefined, silentLoad?: boolean) {
		if (directory === undefined) return;
		return glob(`${directory}\\**\\*.js`).then(async (events: any[]) => {
			for (const commandFile of events) {
				delete require.cache[commandFile];
				const { name } = path.parse(commandFile);
				let File = await require(commandFile);
				if (!instance.utils.isClass(File)) throw new TypeError(`BatFramework > Command ${name} doesn't export a class!`);
				const command = await new File(client, name.toLowerCase());
				if (!(await command instanceof CommandBase)) throw new TypeError(`BatFramework > Command ${name} does not extend CommandBase`);

				if (!command.name) {
					throw new Error(`BatFramework > Command ${name} doesn't have a name, and therefore cannot be used!`)
				}

				const missing = [];

				if (!command.description) {
					missing.push("Description");
				}

				if (!command.category) {
					missing.push("Category");
				}

				if (missing.length > 0 && instance.showWarns) {
					console.warn(`BatFramework > Command "${command.name}" is missing the following properties: ${missing.join(', ')}`)
				}

				this.registerCommand(await command, await command.name.toLowerCase());
			}
			if (!silentLoad) {
				if (this._commands.size > 0) {
					console.log(`BatFramework > Loaded ${this._commands.size} command${this._commands.size > 1 ? 's' : ''}`);
				}
			}
		});
	}

	/**
	 * @description Registers the {CommandBase} and adds it into the _commands Map
	 * @param {CommandBase} command - The {CommandBase} passed into the method
	 * @param {string} name - The commands name as lower case
	 */

	public registerCommand(command: CommandBase, name: string) {
		this._commands.set(name, command)
	}


	public get commands(): Map<String, CommandBase> {
		return this._commands;
	}
}

export = CommandHandler;

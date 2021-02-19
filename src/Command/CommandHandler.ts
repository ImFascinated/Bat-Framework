import { Client, Message } from 'discord.js';
import BatFramework from '../BatClient';
const { promisify } = require('util');
const glob = promisify(require('glob'));
import path from 'path';
import CommandBase from './CommandBase';

type Options = {
	directory?: string,
	silentLoad?: boolean,
}

class CommandHandler {
	private _commands: Map<String, CommandBase> = new Map();

	constructor(instance: BatFramework, client: Client) {
		this.init(instance, client, { directory: instance.commandsDirectory });

		// TODO: Move this to a built-in event.
		client.on('message', (message: Message) => {
			if (!message.guild || message.author.bot) return;

			const prefix = '!'; // TODO: Add guild prefixes
			if (!message.content.startsWith(prefix)) return;

			const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
			const command = this.getCommandByName(cmd);
			if (command) {
				command.run(message, args);
			}
		});
	}

	private init(instance: BatFramework, client: Client, options: Options) {
		let {
			directory,
			silentLoad = false
		} = options

		return glob(`${directory}\\**\\*.js`).then((events: any[]) => {
			for (const commandFile of events) {
				delete require.cache[commandFile];
				const { name } = path.parse(commandFile);
				const File = require(commandFile);
				if (!instance.utils.isClass(File)) throw new TypeError(`BatFramework > Command ${name} doesn't export a class!`);
				const command = new File(client, name.toLowerCase());
				if (!(command instanceof CommandBase)) throw new TypeError(`BatFramework > Command ${name} does not extend CommandBase`);

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

				this.registerCommand(command, command.name.toLowerCase());
			}
			if (!silentLoad) {
				console.log(`BatFramework > Loaded ${this._commands.size} commands.`);
			}
		});
	}

	public registerCommand(command: CommandBase, name: string) {
		this._commands.set(name, command)
	}

	public getCommandByName(name: string): CommandBase | undefined {
		let toReturn: CommandBase | undefined;
		this._commands.forEach(command => {
			if (toReturn) return toReturn;
			if (command.name === name) toReturn = command;
			command.aliases.forEach(alias => {
				if (alias === name) toReturn = command;
			});
		});
		return toReturn;
	}

	public get commands(): Map<String, CommandBase> {
		return this._commands;
	}
}

export = CommandHandler;
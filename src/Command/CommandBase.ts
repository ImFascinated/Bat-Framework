import { Message } from "discord.js";
import Guild from '../Guild/Guild';

type Options = {
	name?: string,
	aliases?: string[],
	description?: string,
	category?: string
}

class CommandBase {
	private _name: string = '';
	private _aliases: string[] = [];
	private _description: string = '';
	private _category: string = '';

	constructor(options: Options) {
		let {
			name = '',
			aliases = [],
			description = '',
			category = ''
		} = options;

		this._name = name;
		this._aliases = aliases;
		this._description = description;
		this._category = category;
	}

	async run(message: Message, args: string[], guildData: Guild) {
		throw new Error(`Command ${this._name} doesn't provide a execute method!`);
	}

	public get name(): string {
		return this._name;
	}

	public get aliases(): string[] {
		return this._aliases;
	}

	public get description(): string {
		return this._description;
	}

	public get category(): string {
		return this._category;
	}
}

export = CommandBase;
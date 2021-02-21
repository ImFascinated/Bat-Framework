import { Message, PermissionString } from "discord.js";
import Guild from '../Guild/Guild';

interface Options {
	name?: string,
	aliases?: string[],
	description?: string,
	category?: string, 
	clientPermissions?: Array<PermissionString>
	userPermissions?: Array<PermissionString>
}

class CommandBase {
	private _name: string = '';
	private _aliases: string[] = [];
	private _description: string = '';
	private _category: string = '';
	private _clientPermissions: Array<PermissionString>;
	private _userPermissions: Array<PermissionString>;

	constructor(options: Options) {
		let {
			name = '',
			aliases = [],
			description = '',
			category = '',
			clientPermissions = new Array<PermissionString>(),
			userPermissions = new Array<PermissionString>()
		} = options;

		this._name = name;
		this._aliases = aliases;
		this._description = description;
		this._category = category;
		this._clientPermissions = clientPermissions;
		this._userPermissions = userPermissions;
	}

	async run(message: Message, args: string[], guildData: Guild) {
		throw new Error(`Command ${this._name} doesn't provide a execute method`);
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

	public get clientPermissions(): Array<PermissionString> | undefined {
		return this._clientPermissions;
	}

	public get userPermissions(): Array<PermissionString> | undefined {
		return this._userPermissions;
	}
}

export = CommandBase;
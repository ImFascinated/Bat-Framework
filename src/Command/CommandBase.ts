import { Message, PermissionString } from "discord.js";
import Guild from '../Guild/Guild';
import CommandCooldown from "./CommandCooldown";
import ICommandOptions from "./ICommandOptions";

class CommandBase {
	private _name: string = '';
	private _aliases: string[] = [];
	private _description: string = '';
	private _category: string = '';
	private _clientPermissions: Array<PermissionString>;
	private _userPermissions: Array<PermissionString>;

	private _cooldown: number = 0;
								// Guild    User    Their cooldowns
	private _userCooldowns: Map<String, Map<String, Array<CommandCooldown>>>;


	constructor(options: ICommandOptions) {
		let {
			name = '',
			aliases = [],
			description = '',
			category = '',
			clientPermissions = new Array<PermissionString>(),
			userPermissions = new Array<PermissionString>(),
			cooldown = 0
		} = options;

		this._name = name;
		this._aliases = aliases;
		this._description = description;
		this._category = category;
		this._clientPermissions = clientPermissions;
		this._userPermissions = userPermissions;

		this._cooldown = cooldown;
		this._userCooldowns = new Map();
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

	public get cooldown(): number {
		return this._cooldown;
	}

	public getUserCooldown(guildId: string, userId: string): number {
		let timeLeft = 0;

		this._userCooldowns.forEach((cooldowns, guild) => {
			if (guildId === guild) {
				cooldowns.forEach((cooldown, user) => {
					if (user === userId) {
						cooldown.forEach((cooldown: { getTimeLeft: () => number; }) => {
							if (cooldown.getTimeLeft() > 0) {
								timeLeft = cooldown.getTimeLeft();
							}
						})
					}
				});
			}
		});
		return timeLeft;
	}

	public setUserCooldown(guildId: string, userId: string) {
		let cooldowns: Map<String, Array<CommandCooldown>> | undefined = this._userCooldowns.get(guildId);
		if (!cooldowns) cooldowns = new Map();
		let userCooldowns = cooldowns.get(userId);
		if (!userCooldowns) userCooldowns = new Array();
		userCooldowns.push(new CommandCooldown(Date.now() + this._cooldown));
		cooldowns.set(userId, userCooldowns);
		this._userCooldowns.set(guildId, cooldowns);
	}
}

export = CommandBase;
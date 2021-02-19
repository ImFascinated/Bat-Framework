import { Client } from "discord.js";
import { EventEmitter } from 'events'
import CommandHandler from "./Command/CommandHandler";
import EventHandler from "./Event/EventHandler";
import GuildManager from "./Guild/GuildManager";
import Utils from "./Utils/Utils";

import mongo, { getMongoConnection } from './Database/Mongo';
import { Connection } from 'mongoose';

type Options = {
	commandsDirectory?: string,
	eventsDirectory?: string,
	showWarns?: boolean,
	databaseOptions?: {}
}

class BatClient extends EventEmitter {
	private _showWarns: boolean = true;
	private _eventsDirectory: string = 'events';
	private _eventHandler: EventHandler;
	private _commandsDirectory: string = 'commands';
	private _commandHandler: CommandHandler;
	private _utils: Utils;
	private _guildManager: GuildManager;

	private _mongo = ''
	private _mongoConnection: Connection | null = null

	constructor(client: Client, options: Options) {
		super();
		if (!client) {
			throw new Error('You must provide a Discord JS client as the first argument');
		}

		let {
			showWarns = true,
			commandsDirectory = 'commands',
			eventsDirectory = 'events',
			databaseOptions,
		} = options;

		if (module && require.main) {
			const { path } = require.main
			if (path) {
				commandsDirectory = `${path}\\${commandsDirectory || this._commandsDirectory}`
				eventsDirectory = `${path}\\${eventsDirectory || this._eventsDirectory}`
			}
		}

		this._showWarns = showWarns;
		this._commandsDirectory = commandsDirectory;
		this._eventsDirectory = eventsDirectory;

		this._eventHandler = new EventHandler(this, client);
		this._commandHandler = new CommandHandler(this, client);
		this._guildManager = new GuildManager();

		this._utils = new Utils();

		setTimeout(async () => {
			if (this._mongo) {
				await mongo(this._mongo, this, databaseOptions);

				this._mongoConnection = getMongoConnection();
			} else {
				if (showWarns) {
					console.warn('WOKCommands > No MongoDB connection URI provided');
				}

				this.emit('databaseConnected', null, '');
			}
		}, 500);
		console.log('BatFramework > Successfully initialized');
	}

	public get showWarns(): boolean {
		return this._showWarns;
	}

	public get eventsDirectory(): string {
		return this._eventsDirectory;
	}

	public get eventHandler(): EventHandler {
		return this._eventHandler;
	}

	public get commandsDirectory(): string {
		return this._commandsDirectory;
	}

	public get commandHandler(): CommandHandler {
		return this._commandHandler;
	}

	public get guildManager(): GuildManager {
		return this._guildManager;
	}

	public get utils(): Utils {
		return this._utils;
	}

	public get mongoPath(): string {
		return this._mongo;
	}

	public setMongoPath(mongoPath: string) {
		this._mongo = mongoPath;
	}

	public get mongoConnection(): Connection | null {
		return this._mongoConnection
	}

	public isDBConnected(): boolean {
		const connection = this.mongoConnection
		return !!(connection && connection.readyState === 1)
	}
}

export = BatClient;
import { Client } from "discord.js";
import { EventEmitter } from 'events'
import CommandHandler from "../Command/CommandHandler";
import EventHandler from "../Event/EventHandler";
import GuildManager from "../Guild/GuildManager";
import FeatureHandler from "../Feature/FeatureHandler";
import Utils from "../Utils/Utils";
import IBatClientOptions from "./IBatClientOptions";

import mongo, { getMongoConnection } from '../Database/Mongo';
import { Connection } from 'mongoose';

class BatClient extends EventEmitter {
	private _showWarns: boolean = true;
	private _defaultPrefix: string = '!';
	private _eventsDirectory: string = 'events';
	private _eventHandler: EventHandler;
	private _commandsDirectory: string = 'commands';
	private _commandHandler: CommandHandler;
	private _featuresDirectory: string = 'features';
	private _featuresHandler: FeatureHandler;
	private _utils: Utils;
	private _guildManager: GuildManager;
	private _autoSaveInterval: number = 300000;
	private _forceLoadGuilds: boolean = false;
	private _botOwners = new Array<String>();

	private _mongo = '';
	private _mongoConnection: Connection | null = null;

	/**
	 * @description Constructs the {BatClient} instance
	 * @param {Client} client - Discord.JS Client
	 * @param {IBatClientOptions} options - BatClient Options
	 */

	constructor(client: Client, options: IBatClientOptions) {
		super();
		if (!client) {
			throw new Error('You must provide a Discord JS client as the first argument');
		}

		let {
			showWarns = true,
			commandsDirectory = 'commands',
			eventsDirectory = 'events',
			featuresDirectory = 'features',
			autoSaveInterval = 300000,
			databaseOptions,
			forceLoadGuilds = false,
			botOwners = []
		} = options;

		if (module && require.main) {
			const { path } = require.main
			if (path) {
				commandsDirectory = `${path}\\${commandsDirectory || this._commandsDirectory}`
				eventsDirectory = `${path}\\${eventsDirectory || this._eventsDirectory}`
				featuresDirectory = `${path}\\${featuresDirectory || this._featuresDirectory}`
			}
		}

		this._showWarns = showWarns;
		this._commandsDirectory = commandsDirectory;
		this._eventsDirectory = eventsDirectory;
		this._featuresDirectory = featuresDirectory;

		this._eventHandler = new EventHandler(this, client);
		this._commandHandler = new CommandHandler(this, client);
		this._featuresHandler = new FeatureHandler(this, client);
		this._guildManager = new GuildManager(this, client);

		this._autoSaveInterval = autoSaveInterval;
		this._forceLoadGuilds = forceLoadGuilds;

		this._botOwners = botOwners;

		this._utils = new Utils();

		setTimeout(async () => {
			if (this._mongo) {
				await mongo(this._mongo, this, databaseOptions);

				this._mongoConnection = getMongoConnection();
			} else {
				if (showWarns) {
					console.warn('BatFramework > No MongoDB connection URI provided');
				}

				this.emit('databaseConnected', null, '');
			}
		}, 1);
		console.log('BatFramework > Successfully initialized');
	}

	public get showWarns(): boolean {
		return this._showWarns;
	}

	public get defaultPrefix(): string {
		return this._defaultPrefix;
	}

	public setDefaultPrefix(prefix: string) {
		this._defaultPrefix = prefix;
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

	public get featuresDirectory(): string {
		return this._featuresDirectory;
	}

	public get featuresHandler(): FeatureHandler {
		return this._featuresHandler;
	}

	public get guildManager(): GuildManager {
		return this._guildManager;
	}

	public get autoSaveInterval(): number {
		return this._autoSaveInterval;
	}

	public get forceLoadGuilds(): boolean {
		return this._forceLoadGuilds;
	}

	public get botOwners(): Array<String> {
		return this._botOwners;
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

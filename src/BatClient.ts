import { Client } from "discord.js";
import CommandHandler from "./Command/CommandHandler";
import EventHandler from "./Event/EventHandler";
import Utils from "./Utils/Utils";

type Options = {
	commandsDirectory?: string,
	eventsDirectory?: string,
	showWarns?: boolean
}

class BatClient {
	private _showWarns: boolean = true;
	private _commandsDirectory: string = 'commands';
	private _commandHandler: CommandHandler;
	private _eventsDirectory: string = 'events';
	private _eventHandler: EventHandler;
	private _utils: Utils;

	constructor(client: Client, options: Options) {
		if (!client) {
			throw new Error('You must provide a Discord JS client as the first argument');
		}

		let {
			showWarns = true,
			commandsDirectory = 'commands',
			eventsDirectory = 'events'
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

		this._utils = new Utils();
		console.log('BatFramework > Successfully initialized.');
	}

	public get commandsDirectory(): string {
		return this._commandsDirectory;
	}

	public get commandHandler(): CommandHandler {
		return this._commandHandler;
	}

	public get eventsDirectory(): string {
		return this._eventsDirectory;
	}

	public get eventHandler(): EventHandler {
		return this._eventHandler;
	}

	public get showWarns(): boolean {
		return this._showWarns;
	}

	public get utils(): Utils {
		return this._utils;
	}
}

export = BatClient;
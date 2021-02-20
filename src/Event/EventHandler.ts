import { Client } from "discord.js";
import EventBase from "./EventBase";
import BatClient from '../BatClient';
const { promisify } = require('util');
const glob = promisify(require('glob'));
import path from 'path';

type Options = {
	directory?: string,
	silentLoad?: boolean,
}

class EventHandler {
	private _events: Map<String, EventBase> = new Map();

	/**
	 * @description Constructs the {@link EventHandler} instance
	 * @param {@link BatClient} instance - The main instance for BatClient.
	 * @param {@link Client} client - Discord.JS client
	 */

	constructor(instance: BatClient, client: Client) {
		this.init(instance, client, { directory: instance.eventsDirectory });
	}

	/**
	 * @description Initializes the events, gets them ready within the {@link Client} and stores them into the _events Map
	 * @param {@link BatClient} instance - The main instance for BatClient.
	 * @param {@link Client} client - Discord.JS client
	 * @param {@link Options} options - The {@link Options} passed into the method
	 * @private
	 */

	private init(instance: BatClient, client: Client, options: Options) {
		let {
			directory,
			silentLoad = false
		} = options

		return glob(`${directory}\\**\\*.js`).then((events: any[]) => {
			for (const eventFile of events) {
				delete require.cache[eventFile];
				const { name } = path.parse(eventFile);
				const File = require(eventFile);
				if (!instance.utils.isClass(File)) throw new TypeError(`Event ${name} doesn't export a class!`);
				const event = new File(client, name);
				if (!(event instanceof EventBase)) throw new TypeError(`Event ${name} does not extend EventBase`);
				if (name === undefined) continue;
				this.registerEvent(instance, client, event, name);
			}
			if (!silentLoad) {
				if (this._events.size > 0) {
					console.log(`BatFramework > Loaded ${this._events.size} events`);
				}
			}
		});
	}

	/**
	 *
	 * @param {@link BatClient} instance - The main instance for BatClient.
	 * @param {@link Client} client - Discord.JS client
	 * @param {@link Event} event - The {@link Event} passed into the method
	 * @param {@link string} name - The events name
	 */

	public registerEvent(instance: BatClient, client: any, event: EventBase, name: string) {
		if (!event.event) {
			throw new Error(`BatFramework > Event ${name} does not have an event type, therefore it cannot run.`);
		}

		this._events.set(event.event, event);
		client[event.type](event.event, (...args: any) => {
			event.run(instance, client, ...args)
		});
	}
}

export = EventHandler;

import { Client } from "discord.js";
import BatClient from "../BatClient";

type Options = {
	event?: string,
	type?: string,
	once?: boolean
}

class EventBase {
	private _event: string = '';
	private _type: string = 'on';

	constructor(options: Options) {
		let {
			event = '',
			type = 'on'
		} = options;

		this._event = event;
		this._type = type;
	}

	public run(instance: BatClient, client: Client, ...args: any) {
		throw new Error(`The event ${this._type} is missing the run method`);
	}

	public get event(): string {
		return this._event;
	}

	public get type(): string {
		return this._type;
	}
}

export = EventBase;
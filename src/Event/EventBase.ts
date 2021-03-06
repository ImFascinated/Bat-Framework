import { Client } from "discord.js";
import BatClient from "../Client/BatClient";
import IEventOptions from "./IEventOptions";

class EventBase {
	private _event: string = '';
	private _type: string = 'on';

	/**
	* @param {IEventOptions} options
	*/

	constructor(options: IEventOptions) {
		let {
			event = '',
			type = 'on'
		} = options;

		this._event = event;
		this._type = type;
	}

	/**
	 * @param {BatClient} instance 
	 * @param {Client} client 
	 * @param {string[]} args 
	 */

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
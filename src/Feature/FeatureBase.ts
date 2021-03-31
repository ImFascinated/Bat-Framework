import { Client } from "discord.js";
import BatClient from "../Client/BatClient";

class EventBase {
	constructor() {}

	/**
	 * @param {BatClient} instance 
	 * @param {Client} client 
	 */

	public init(instance: BatClient, client: Client) {
		throw new Error(`The feature !!!TODO!!! is missing the run method`);
	}
}

export = EventBase;
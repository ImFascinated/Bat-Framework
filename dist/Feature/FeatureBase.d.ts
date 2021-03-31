import { Client } from "discord.js";
import BatClient from "../Client/BatClient";
declare class EventBase {
    constructor();
    /**
     * @param {BatClient} instance
     * @param {Client} client
     */
    init(instance: BatClient, client: Client): void;
}
export = EventBase;

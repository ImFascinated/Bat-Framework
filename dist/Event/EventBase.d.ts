import { Client } from "discord.js";
import BatClient from "../Client/BatClient";
import IEventOptions from "./IEventOptions";
declare class EventBase {
    private _event;
    private _type;
    /**
    * @param {IEventOptions} options
    */
    constructor(options: IEventOptions);
    /**
     * @param {BatClient} instance
     * @param {Client} client
     * @param {string[]} args
     */
    run(instance: BatClient, client: Client, ...args: any): void;
    get event(): string;
    get type(): string;
}
export = EventBase;

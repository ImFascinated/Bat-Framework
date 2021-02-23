import { Client } from "discord.js";
import EventBase from "./EventBase";
import BatClient from '../Client/BatClient';
declare class EventHandler {
    private _events;
    /**
     * @description Constructs the {EventHandler} instance
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     */
    constructor(instance: BatClient, client: Client);
    /**
     * @description Initializes the events, gets them ready within the {Client} and stores them into the _events Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     * @param {Options} options - The {Options} passed into the method
     * @private
     */
    private init;
    /**
     * @description Registers the {EventBase} and adds it to the _events Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     * @param {EventBase} event - The {EventBase} passed into the method
     * @param {string} name - The events name
     */
    registerEvent(instance: BatClient, client: any, event: EventBase, name: string): void;
}
export = EventHandler;

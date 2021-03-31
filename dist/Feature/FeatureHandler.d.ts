import { Client } from "discord.js";
import FeatureBase from "./FeatureBase";
import BatClient from '../Client/BatClient';
declare class FeatureHandler {
    private _features;
    /**
     * @description Constructs the {FeatureHandler} instance
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     */
    constructor(instance: BatClient, client: Client);
    /**
     * @description Initializes the features, gets them ready within the {Client} and stores them into the _features Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     * @param {Options} options - The {Options} passed into the method
     * @private
     */
    private init;
    /**
     * @description Registers the {FeatureBase} and adds it to the _features Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     * @param {FeatureBase} feature - The {FeatureBase} passed into the method
     */
    registerFeature(instance: BatClient, client: any, feature: FeatureBase, name: string): void;
}
export = FeatureHandler;

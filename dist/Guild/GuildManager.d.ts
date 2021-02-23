import { Client } from 'discord.js';
import BatClient from '../Client/BatClient';
import Guild from './Guild';
declare class GuildManager {
    private _guilds;
    /**
     * @description Constructs the {GuildManager} instance
     * @param {BatClient} instance - The main instance for BatClient.
     */
    constructor(instance: BatClient, client: Client);
    /**
     * @description Loads the guild with the provided id into the _guild Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {string} id - Guild id
     * @private
     */
    private loadGuild;
    /**
     * @description Inserts the {Guild} into the database if it doesn't exist in the _guilds Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {string} id - Guild id
     */
    createGuild(instance: BatClient, id: string): Promise<void>;
    /**
     * @description Gets the provided guilds {Guild} object and then returns it
     * @param {string} id - Guild id
     * @returns Guild
     */
    getGuild(id: string): Guild | undefined;
}
export = GuildManager;

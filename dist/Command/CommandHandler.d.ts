import { Client } from 'discord.js';
import BatFramework from '../Client/BatClient';
import CommandBase from './CommandBase';
import BatClient from '../Client/BatClient';
declare class CommandHandler {
    private _commands;
    /**
     * @description Constructs the {CommandHandler} instance
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     */
    constructor(instance: BatFramework, client: Client);
    /**
     * @description Initializes the commands, gets them ready within the {Client} and stores them into the _commands Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     * @param {Options} options - The {Options} passed into the method
     * @private
     */
    private init;
    /**
     * @description Finds the {CommandBase} that has the provided name
     * @param {string} name - Provided name
     * @returns CommandBase
     */
    getCommandByName(name: string): CommandBase | undefined;
    loadCommands(instance: BatClient, client: Client, directory: string | undefined, silentLoad?: boolean): Promise<any>;
    /**
     * @description Registers the {CommandBase} and adds it into the _commands Map
     * @param {CommandBase} command - The {CommandBase} passed into the method
     * @param {string} name - The commands name as lower case
     */
    registerCommand(command: CommandBase, name: string): void;
    get commands(): Map<String, CommandBase>;
}
export = CommandHandler;

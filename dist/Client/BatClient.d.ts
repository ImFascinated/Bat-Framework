/// <reference types="node" />
import { Client } from "discord.js";
import { EventEmitter } from 'events';
import CommandHandler from "../Command/CommandHandler";
import EventHandler from "../Event/EventHandler";
import GuildManager from "../Guild/GuildManager";
import FeatureHandler from "../Feature/FeatureHandler";
import Utils from "../Utils/Utils";
import IBatClientOptions from "./IBatClientOptions";
import { Connection } from 'mongoose';
declare class BatClient extends EventEmitter {
    private _showWarns;
    private _defaultPrefix;
    private _eventsDirectory;
    private _eventHandler;
    private _commandsDirectory;
    private _commandHandler;
    private _featuresDirectory;
    private _featuresHandler;
    private _utils;
    private _guildManager;
    private _autoSaveInterval;
    private _forceLoadGuilds;
    private _botOwners;
    private _mongo;
    private _mongoConnection;
    /**
     * @description Constructs the {BatClient} instance
     * @param {Client} client - Discord.JS Client
     * @param {IBatClientOptions} options - BatClient Options
     */
    constructor(client: Client, options: IBatClientOptions);
    get showWarns(): boolean;
    get defaultPrefix(): string;
    setDefaultPrefix(prefix: string): void;
    get eventsDirectory(): string;
    get eventHandler(): EventHandler;
    get commandsDirectory(): string;
    get commandHandler(): CommandHandler;
    get featuresDirectory(): string;
    get featuresHandler(): FeatureHandler;
    get guildManager(): GuildManager;
    get autoSaveInterval(): number;
    get forceLoadGuilds(): boolean;
    get botOwners(): Array<String>;
    get utils(): Utils;
    get mongoPath(): string;
    setMongoPath(mongoPath: string): void;
    get mongoConnection(): Connection | null;
    isDBConnected(): boolean;
}
export = BatClient;

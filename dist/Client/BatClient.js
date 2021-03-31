"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const events_1 = require("events");
const CommandHandler_1 = __importDefault(require("../Command/CommandHandler"));
const EventHandler_1 = __importDefault(require("../Event/EventHandler"));
const GuildManager_1 = __importDefault(require("../Guild/GuildManager"));
const FeatureHandler_1 = __importDefault(require("../Feature/FeatureHandler"));
const Utils_1 = __importDefault(require("../Utils/Utils"));
const Mongo_1 = __importStar(require("../Database/Mongo"));
class BatClient extends events_1.EventEmitter {
    /**
     * @description Constructs the {BatClient} instance
     * @param {Client} client - Discord.JS Client
     * @param {IBatClientOptions} options - BatClient Options
     */
    constructor(client, options) {
        super();
        this._showWarns = true;
        this._defaultPrefix = '!';
        this._eventsDirectory = 'events';
        this._commandsDirectory = 'commands';
        this._featuresDirectory = 'features';
        this._autoSaveInterval = 300000;
        this._forceLoadGuilds = false;
        this._botOwners = new Array();
        this._mongo = '';
        this._mongoConnection = null;
        if (!client) {
            throw new Error('You must provide a Discord JS client as the first argument');
        }
        let { showWarns = true, commandsDirectory = 'commands', eventsDirectory = 'events', featuresDirectory = 'features', autoSaveInterval = 300000, databaseOptions, forceLoadGuilds = false, botOwners = [] } = options;
        if (module && require.main) {
            const { path } = require.main;
            if (path) {
                commandsDirectory = `${path}\\${commandsDirectory || this._commandsDirectory}`;
                eventsDirectory = `${path}\\${eventsDirectory || this._eventsDirectory}`;
                featuresDirectory = `${path}\\${featuresDirectory || this._featuresDirectory}`;
            }
        }
        this._showWarns = showWarns;
        this._commandsDirectory = commandsDirectory;
        this._eventsDirectory = eventsDirectory;
        this._featuresDirectory = featuresDirectory;
        this._eventHandler = new EventHandler_1.default(this, client);
        this._commandHandler = new CommandHandler_1.default(this, client);
        this._featuresHandler = new FeatureHandler_1.default(this, client);
        this._guildManager = new GuildManager_1.default(this, client);
        this._autoSaveInterval = autoSaveInterval;
        this._forceLoadGuilds = forceLoadGuilds;
        this._botOwners = botOwners;
        this._utils = new Utils_1.default();
        setTimeout(async () => {
            if (this._mongo) {
                await Mongo_1.default(this._mongo, this, databaseOptions);
                this._mongoConnection = Mongo_1.getMongoConnection();
            }
            else {
                if (showWarns) {
                    console.warn('BatFramework > No MongoDB connection URI provided');
                }
                this.emit('databaseConnected', null, '');
            }
        }, 1);
        console.log('BatFramework > Successfully initialized');
    }
    get showWarns() {
        return this._showWarns;
    }
    get defaultPrefix() {
        return this._defaultPrefix;
    }
    setDefaultPrefix(prefix) {
        this._defaultPrefix = prefix;
    }
    get eventsDirectory() {
        return this._eventsDirectory;
    }
    get eventHandler() {
        return this._eventHandler;
    }
    get commandsDirectory() {
        return this._commandsDirectory;
    }
    get commandHandler() {
        return this._commandHandler;
    }
    get featuresDirectory() {
        return this._featuresDirectory;
    }
    get featuresHandler() {
        return this._featuresHandler;
    }
    get guildManager() {
        return this._guildManager;
    }
    get autoSaveInterval() {
        return this._autoSaveInterval;
    }
    get forceLoadGuilds() {
        return this._forceLoadGuilds;
    }
    get botOwners() {
        return this._botOwners;
    }
    get utils() {
        return this._utils;
    }
    get mongoPath() {
        return this._mongo;
    }
    setMongoPath(mongoPath) {
        this._mongo = mongoPath;
    }
    get mongoConnection() {
        return this._mongoConnection;
    }
    isDBConnected() {
        const connection = this.mongoConnection;
        return !!(connection && connection.readyState === 1);
    }
}
module.exports = BatClient;

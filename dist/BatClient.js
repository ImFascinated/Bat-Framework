"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var CommandHandler_1 = __importDefault(require("./Command/CommandHandler"));
var EventHandler_1 = __importDefault(require("./Event/EventHandler"));
var Utils_1 = __importDefault(require("./Utils/Utils"));
var BatClient = /** @class */ (function () {
    function BatClient(client, options) {
        this._showWarns = true;
        this._commandsDirectory = 'commands';
        this._eventsDirectory = 'events';
        if (!client) {
            throw new Error('You must provide a Discord JS client as the first argument');
        }
        var _a = options.showWarns, showWarns = _a === void 0 ? true : _a, _b = options.commandsDirectory, commandsDirectory = _b === void 0 ? 'commands' : _b, _c = options.eventsDirectory, eventsDirectory = _c === void 0 ? 'events' : _c;
        if (module && require.main) {
            var path = require.main.path;
            if (path) {
                commandsDirectory = path + "\\" + (commandsDirectory || this._commandsDirectory);
                eventsDirectory = path + "\\" + (eventsDirectory || this._eventsDirectory);
            }
        }
        this._showWarns = showWarns;
        this._commandsDirectory = commandsDirectory;
        this._eventsDirectory = eventsDirectory;
        this._eventHandler = new EventHandler_1.default(this, client);
        this._commandHandler = new CommandHandler_1.default(this, client);
        this._utils = new Utils_1.default();
        console.log('BatFramework > Successfully initialized.');
    }
    Object.defineProperty(BatClient.prototype, "commandsDirectory", {
        get: function () {
            return this._commandsDirectory;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "commandHandler", {
        get: function () {
            return this._commandHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "eventsDirectory", {
        get: function () {
            return this._eventsDirectory;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "eventHandler", {
        get: function () {
            return this._eventHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "showWarns", {
        get: function () {
            return this._showWarns;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "utils", {
        get: function () {
            return this._utils;
        },
        enumerable: false,
        configurable: true
    });
    return BatClient;
}());
module.exports = BatClient;

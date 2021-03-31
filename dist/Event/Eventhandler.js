"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const EventBase_1 = __importDefault(require("./EventBase"));
const { promisify } = require('util');
const glob = promisify(require('glob'));
const path_1 = __importDefault(require("path"));
class EventHandler {
    /**
     * @description Constructs the {EventHandler} instance
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     */
    constructor(instance, client) {
        this._events = new Map();
        this.init(instance, client, { directory: instance.eventsDirectory });
    }
    /**
     * @description Initializes the events, gets them ready within the {Client} and stores them into the _events Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     * @param {Options} options - The {Options} passed into the method
     * @private
     */
    init(instance, client, options) {
        let { directory, silentLoad = false } = options;
        return glob(`${directory}\\**\\*.js`).then((events) => {
            for (const eventFile of events) {
                delete require.cache[eventFile];
                const { name } = path_1.default.parse(eventFile);
                const File = require(eventFile);
                if (!instance.utils.isClass(File))
                    throw new TypeError(`Event ${name} doesn't export a class!`);
                const event = new File(client, name);
                if (!(event instanceof EventBase_1.default))
                    throw new TypeError(`Event ${name} does not extend EventBase`);
                if (name === undefined)
                    continue;
                this.registerEvent(instance, client, event, name);
            }
            if (!silentLoad) {
                if (this._events.size > 0) {
                    console.log(`BatFramework > Loaded ${this._events.size} event${this._events.size > 1 ? 's' : ''}`);
                }
            }
        });
    }
    /**
     * @description Registers the {EventBase} and adds it to the _events Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     * @param {EventBase} event - The {EventBase} passed into the method
     * @param {string} name - The events name
     */
    registerEvent(instance, client, event, name) {
        if (!event.event) {
            throw new Error(`BatFramework > Event ${name} does not have an event type, therefore it cannot run.`);
        }
        this._events.set(event.event, event);
        client[event.type](event.event, (...args) => {
            event.run(instance, client, ...args);
        });
    }
}
module.exports = EventHandler;

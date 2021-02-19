"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var EventBase_1 = __importDefault(require("./EventBase"));
var promisify = require('util').promisify;
var glob = promisify(require('glob'));
var path_1 = __importDefault(require("path"));
var EventHandler = /** @class */ (function () {
    function EventHandler(instance, client) {
        this._events = new Map();
        this.init(instance, client, { directory: instance.eventsDirectory });
    }
    EventHandler.prototype.init = function (instance, client, options) {
        var _this = this;
        var directory = options.directory, _a = options.silentLoad, silentLoad = _a === void 0 ? false : _a;
        return glob(directory + "\\**\\*.js").then(function (events) {
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var eventFile = events_1[_i];
                delete require.cache[eventFile];
                var name_1 = path_1.default.parse(eventFile).name;
                var File_1 = require(eventFile);
                if (!instance.utils.isClass(File_1))
                    throw new TypeError("Event " + name_1 + " doesn't export a class!");
                var event_1 = new File_1(client, name_1);
                if (!(event_1 instanceof EventBase_1.default))
                    throw new TypeError("Event " + name_1 + " does not extend EventBase");
                if (name_1 === undefined)
                    continue;
                _this.registerEvent(client, event_1, name_1);
            }
            if (!silentLoad) {
                console.log("BatFramework > Loaded " + _this._events.size + " events.");
            }
        });
    };
    EventHandler.prototype.registerEvent = function (client, event, name) {
        this._events.set(name, event);
        client[event.type](name, function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return event.run.apply(event, args);
        });
    };
    return EventHandler;
}());
module.exports = EventHandler;

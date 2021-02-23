"use strict";
var EventBase = /** @class */ (function () {
    /**
    * @param {IEventOptions} options
    */
    function EventBase(options) {
        this._event = '';
        this._type = 'on';
        var _a = options.event, event = _a === void 0 ? '' : _a, _b = options.type, type = _b === void 0 ? 'on' : _b;
        this._event = event;
        this._type = type;
    }
    /**
     * @param {BatClient} instance
     * @param {Client} client
     * @param {string[]} args
     */
    EventBase.prototype.run = function (instance, client) {
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        throw new Error("The event " + this._type + " is missing the run method");
    };
    Object.defineProperty(EventBase.prototype, "event", {
        get: function () {
            return this._event;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EventBase.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    return EventBase;
}());
module.exports = EventBase;

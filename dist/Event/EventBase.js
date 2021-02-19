"use strict";
var EventBase = /** @class */ (function () {
    function EventBase(options) {
        this._type = 'on';
        this._once = false;
        var _a = options.type, type = _a === void 0 ? 'on' : _a, _b = options.once, once = _b === void 0 ? false : _b;
        this._type = type;
        this._once = once;
    }
    EventBase.prototype.run = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        throw new Error("The event " + this._type + " is missing the run method.");
    };
    Object.defineProperty(EventBase.prototype, "type", {
        get: function () {
            return this._type;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EventBase.prototype, "once", {
        get: function () {
            return this._once;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(EventBase.prototype, "emitter", {
        get: function () {
            return this._emitter;
        },
        enumerable: false,
        configurable: true
    });
    return EventBase;
}());
module.exports = EventBase;

"use strict";
var EventBase = /** @class */ (function () {
    function EventBase(options) {
        this._event = '';
        this._type = 'on';
        this._once = false;
        var _a = options.event, event = _a === void 0 ? '' : _a, _b = options.type, type = _b === void 0 ? 'on' : _b, _c = options.once, once = _c === void 0 ? false : _c;
        this._event = event;
        this._type = type;
        this._once = once;
    }
    EventBase.prototype.run = function (instance) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
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
    Object.defineProperty(EventBase.prototype, "once", {
        get: function () {
            return this._once;
        },
        enumerable: false,
        configurable: true
    });
    return EventBase;
}());
module.exports = EventBase;

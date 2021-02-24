"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var path_1 = __importDefault(require("path"));
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.prototype.isClass = function (input) {
        console.log(input.toString().substring(0, 5));
        return typeof input === 'function' &&
            typeof input.prototype === 'object' &&
            input.toString().substring(0, 5) === 'class';
    };
    Object.defineProperty(Utils.prototype, "directory", {
        get: function () {
            if (require.main === undefined)
                return;
            return "" + path_1.default.dirname(require.main.filename) + path_1.default.sep;
        },
        enumerable: false,
        configurable: true
    });
    return Utils;
}());
module.exports = Utils;

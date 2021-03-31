"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = __importDefault(require("path"));
class Utils {
    isClass(obj) {
        const isCtorClass = obj.constructor && obj.constructor.toString().substring(0, 5) === 'class';
        //console.log(`Class: ${obj.name} Constructor Name: ${obj.constructor}`)
        if (obj.prototype === undefined) {
            return isCtorClass;
        }
        const isPrototypeCtorClass = obj.prototype.constructor && obj.prototype.constructor.toString && obj.prototype.constructor.toString().substring(0, 5) === 'class';
        return isCtorClass || isPrototypeCtorClass;
    }
    get directory() {
        if (require.main === undefined)
            return;
        return `${path_1.default.dirname(require.main.filename)}${path_1.default.sep}`;
    }
}
module.exports = Utils;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CommandCooldown = /** @class */ (function () {
    function CommandCooldown(endTime) {
        this._endTime = endTime;
    }
    CommandCooldown.prototype.getTimeLeft = function () {
        return this._endTime - Date.now();
    };
    return CommandCooldown;
}());
exports.default = CommandCooldown;

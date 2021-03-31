"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CommandCooldown {
    constructor(endTime) {
        this._endTime = endTime;
    }
    getTimeLeft() {
        return this._endTime - Date.now();
    }
}
exports.default = CommandCooldown;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var mongoose_1 = __importDefault(require("mongoose"));
/**
 * @description Guild Schema
 */
var schema = new mongoose_1.default.Schema({
    id: String,
    prefix: String,
    disabledCommands: Array,
    data: Array
});
module.exports = mongoose_1.default.model('batframework-guilds', schema);

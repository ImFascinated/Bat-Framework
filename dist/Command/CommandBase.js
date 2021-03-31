"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const CommandCooldown_1 = __importDefault(require("./CommandCooldown"));
class CommandBase {
    /**
     * @param {ICommandOptions} options
     */
    constructor(options) {
        this._name = '';
        this._aliases = [];
        this._description = '';
        this._usage = '';
        this._category = '';
        this._botOwnerOnly = false;
        this._cooldown = 0;
        let { name = '', aliases = [], description = '', usage = '', category = '', clientPermissions = new Array(), userPermissions = new Array(), cooldown = 0, botOwnerOnly = false } = options;
        this._name = name;
        this._aliases = aliases;
        this._description = description;
        this._category = category;
        this._usage = usage;
        this._clientPermissions = clientPermissions;
        this._userPermissions = userPermissions;
        this._botOwnerOnly = botOwnerOnly;
        this._cooldown = cooldown;
        this._userCooldowns = new Map();
    }
    /**
     * @param {Message} message
     * @param {string[]} args
     * @param {Guild} guildData
     */
    async run(instance, client, message, args, guildData) {
        throw new Error(`Command ${this._name} doesn't provide a execute method`);
    }
    get name() {
        return this._name;
    }
    get aliases() {
        return this._aliases;
    }
    get description() {
        return this._description;
    }
    get usage() {
        return this._usage;
    }
    get category() {
        return this._category;
    }
    get clientPermissions() {
        return this._clientPermissions;
    }
    get userPermissions() {
        return this._userPermissions;
    }
    get botOwnerOnly() {
        return this._botOwnerOnly;
    }
    get cooldown() {
        return this._cooldown;
    }
    getUserCooldown(guildId, userId) {
        let timeLeft = 0;
        this._userCooldowns.forEach((cooldowns, guild) => {
            if (guildId === guild) {
                cooldowns.forEach((cooldown, user) => {
                    if (user === userId) {
                        cooldown.forEach((cooldown) => {
                            if (cooldown.getTimeLeft() > 0) {
                                timeLeft = cooldown.getTimeLeft();
                            }
                        });
                    }
                });
            }
        });
        return timeLeft;
    }
    setUserCooldown(guildId, userId) {
        let cooldowns = this._userCooldowns.get(guildId);
        if (!cooldowns)
            cooldowns = new Map();
        let userCooldowns = cooldowns.get(userId);
        if (!userCooldowns)
            userCooldowns = new Array();
        userCooldowns.push(new CommandCooldown_1.default(Date.now() + this._cooldown));
        cooldowns.set(userId, userCooldowns);
        this._userCooldowns.set(guildId, cooldowns);
    }
}
module.exports = CommandBase;

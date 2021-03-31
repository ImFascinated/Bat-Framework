"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const CommandBase_1 = __importDefault(require("../../CommandBase"));
module.exports = class CommandCommand extends CommandBase_1.default {
    constructor() {
        super({
            name: 'command',
            description: 'Command settings',
            category: 'settings',
            userPermissions: [
                'ADMINISTRATOR'
            ]
        });
    }
    async run(instance, client, message, args, guildData) {
        const { channel } = message;
        if (args.length < 1) {
            channel.send(new discord_js_1.MessageEmbed()
                .setTitle('Command Settings')
                .setDescription("**Command Disabling**\n" +
                "" +
                "__Usage__" +
                `${guildData.prefix}command disable <name>` +
                "" +
                "__Example__" +
                `${guildData.prefix}command disable <help>`));
            return;
        }
    }
};

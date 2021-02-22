"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var discord_js_1 = require("discord.js");
var promisify = require('util').promisify;
var glob = promisify(require('glob'));
var ms_1 = __importDefault(require("ms"));
var path_1 = __importDefault(require("path"));
var CommandBase_1 = __importDefault(require("./CommandBase"));
var CommandHandler = /** @class */ (function () {
    /**
     * @description Constructs the {CommandHandler} instance
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     */
    function CommandHandler(instance, client) {
        var _this = this;
        this._commands = new Map();
        this.init(instance, client, { directory: instance.commandsDirectory });
        // TODO: Move this to a built-in event.
        client.on('message', function (message) { return __awaiter(_this, void 0, void 0, function () {
            var guild, member, author, content, channel, guildData, prefix, _a, cmd, args, command, missingPermissions_1, missingPermissions_2, left;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        guild = message.guild, member = message.member, author = message.author, content = message.content, channel = message.channel;
                        if (!guild || author.bot)
                            return [2 /*return*/];
                        if (!member)
                            return [2 /*return*/];
                        return [4 /*yield*/, instance.guildManager.createGuild(instance, guild.id)];
                    case 1:
                        _c.sent();
                        guildData = instance.guildManager.getGuild(guild.id);
                        if (!(guildData === undefined)) return [3 /*break*/, 3];
                        return [4 /*yield*/, instance.guildManager.createGuild(instance, guild.id)];
                    case 2:
                        _c.sent();
                        guildData = instance.guildManager.getGuild(guild.id);
                        _c.label = 3;
                    case 3:
                        if (guildData === undefined)
                            return [2 /*return*/];
                        prefix = (_b = guildData.getData('prefix')) === null || _b === void 0 ? void 0 : _b.toString();
                        if (prefix === undefined)
                            return [2 /*return*/];
                        if (!content.startsWith(prefix))
                            return [2 /*return*/];
                        _a = content.slice(prefix.length).trim().split(/ +/g), cmd = _a[0], args = _a.slice(1);
                        command = this.getCommandByName(cmd);
                        if (command) {
                            // Checking if command has client permissions, and if it does, check if the client (the bot) has the permission(s)
                            if (command.clientPermissions) {
                                missingPermissions_1 = [];
                                command.clientPermissions.forEach(function (permission) {
                                    var _a;
                                    if (!((_a = guild.me) === null || _a === void 0 ? void 0 : _a.hasPermission(permission))) {
                                        missingPermissions_1.push(permission);
                                    }
                                });
                                if (missingPermissions_1.length !== 0) {
                                    return [2 /*return*/, channel.send(new discord_js_1.MessageEmbed()
                                            .setColor('RED')
                                            .setDescription("I am missing the permission" + (missingPermissions_1.length > 1 ? 's' : '') + " `" + missingPermissions_1.join(', ') + "` and cannot run this command."))];
                                }
                            }
                            // Checking if command has user permissions, and if it does, it checks to see if the user has the permission(s)
                            if (command.userPermissions) {
                                missingPermissions_2 = [];
                                command.userPermissions.forEach(function (permission) {
                                    if (!(member === null || member === void 0 ? void 0 : member.hasPermission(permission))) {
                                        missingPermissions_2.push(permission);
                                    }
                                });
                                if (missingPermissions_2.length !== 0) {
                                    return [2 /*return*/, channel.send(new discord_js_1.MessageEmbed()
                                            .setColor('RED')
                                            .setDescription("You are missing the permission" + (missingPermissions_2.length > 1 ? 's' : '') + " `" + missingPermissions_2.join(', ') + "` and cannot use this command."))];
                                }
                            }
                            if (command.cooldown) {
                                if (command.cooldown <= 0)
                                    return [2 /*return*/];
                                left = command.getUserCooldown(guild.id, member.id);
                                if (left <= 0) {
                                    command.setUserCooldown(guild.id, member.id);
                                }
                                if (left > 0) {
                                    return [2 /*return*/, channel.send(new discord_js_1.MessageEmbed()
                                            .setColor('RED')
                                            .setDescription("You are still on command cooldown for **" + ms_1.default(left, { long: true }) + "**."))];
                                }
                            }
                            command.run(message, args, guildData);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    }
    /**
     * @description Initializes the commands, gets them ready within the {Client} and stores them into the _commands Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {Client} client - Discord.JS client
     * @param {Options} options - The {Options} passed into the method
     * @private
     */
    CommandHandler.prototype.init = function (instance, client, options) {
        var _this = this;
        var directory = options.directory, _a = options.silentLoad, silentLoad = _a === void 0 ? false : _a;
        return glob(directory + "\\**\\*.js").then(function (events) {
            for (var _i = 0, events_1 = events; _i < events_1.length; _i++) {
                var commandFile = events_1[_i];
                delete require.cache[commandFile];
                var name_1 = path_1.default.parse(commandFile).name;
                var File_1 = require(commandFile);
                if (!instance.utils.isClass(File_1))
                    throw new TypeError("BatFramework > Command " + name_1 + " doesn't export a class!");
                var command = new File_1(client, name_1.toLowerCase());
                if (!(command instanceof CommandBase_1.default))
                    throw new TypeError("BatFramework > Command " + name_1 + " does not extend CommandBase");
                if (!command.name) {
                    throw new Error("BatFramework > Command " + name_1 + " doesn't have a name, and therefore cannot be used!");
                }
                var missing = [];
                if (!command.description) {
                    missing.push("Description");
                }
                if (!command.category) {
                    missing.push("Category");
                }
                if (missing.length > 0 && instance.showWarns) {
                    console.warn("BatFramework > Command \"" + command.name + "\" is missing the following properties: " + missing.join(', '));
                }
                _this.registerCommand(command, command.name.toLowerCase());
            }
            if (!silentLoad) {
                if (_this._commands.size > 0) {
                    console.log("BatFramework > Loaded " + _this._commands.size + " commands");
                }
            }
        });
    };
    /**
     * @description Registers the {CommandBase} and adds it into the _commands Map
     * @param {CommandBase} command - The {CommandBase} passed into the method
     * @param {string} name - The commands name as lower case
     */
    CommandHandler.prototype.registerCommand = function (command, name) {
        this._commands.set(name, command);
    };
    /**
     * @description Finds the {CommandBase} that has the provided name
     * @param {string} name - Provided name
     * @returns CommandBase
     */
    CommandHandler.prototype.getCommandByName = function (name) {
        var toReturn = undefined;
        this._commands.forEach(function (command) {
            if (toReturn)
                return toReturn;
            if (command.name === name)
                toReturn = command;
            if (command.aliases) {
                command.aliases.forEach(function (alias) {
                    if (alias === name)
                        toReturn = command;
                });
            }
        });
        return toReturn;
    };
    Object.defineProperty(CommandHandler.prototype, "commands", {
        get: function () {
            return this._commands;
        },
        enumerable: false,
        configurable: true
    });
    return CommandHandler;
}());
module.exports = CommandHandler;

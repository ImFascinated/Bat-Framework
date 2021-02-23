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
var CommandCooldown_1 = __importDefault(require("./CommandCooldown"));
var CommandBase = /** @class */ (function () {
    /**
     * @param {ICommandOptions} options
     */
    function CommandBase(options) {
        this._name = '';
        this._aliases = [];
        this._description = '';
        this._usage = '';
        this._category = '';
        this._cooldown = 0;
        var _a = options.name, name = _a === void 0 ? '' : _a, _b = options.aliases, aliases = _b === void 0 ? [] : _b, _c = options.description, description = _c === void 0 ? '' : _c, _d = options.usage, usage = _d === void 0 ? '' : _d, _e = options.category, category = _e === void 0 ? '' : _e, _f = options.clientPermissions, clientPermissions = _f === void 0 ? new Array() : _f, _g = options.userPermissions, userPermissions = _g === void 0 ? new Array() : _g, _h = options.cooldown, cooldown = _h === void 0 ? 0 : _h;
        this._name = name;
        this._aliases = aliases;
        this._description = description;
        this._category = category;
        this._usage = usage;
        this._clientPermissions = clientPermissions;
        this._userPermissions = userPermissions;
        this._cooldown = cooldown;
        this._userCooldowns = new Map();
    }
    /**
     * @param {Message} message
     * @param {string[]} args
     * @param {Guild} guildData
     */
    CommandBase.prototype.run = function (instance, client, message, args, guildData) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                throw new Error("Command " + this._name + " doesn't provide a execute method");
            });
        });
    };
    Object.defineProperty(CommandBase.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "aliases", {
        get: function () {
            return this._aliases;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "description", {
        get: function () {
            return this._description;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "usage", {
        get: function () {
            return this._usage;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "category", {
        get: function () {
            return this._category;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "clientPermissions", {
        get: function () {
            return this._clientPermissions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "userPermissions", {
        get: function () {
            return this._userPermissions;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(CommandBase.prototype, "cooldown", {
        get: function () {
            return this._cooldown;
        },
        enumerable: false,
        configurable: true
    });
    CommandBase.prototype.getUserCooldown = function (guildId, userId) {
        var timeLeft = 0;
        this._userCooldowns.forEach(function (cooldowns, guild) {
            if (guildId === guild) {
                cooldowns.forEach(function (cooldown, user) {
                    if (user === userId) {
                        cooldown.forEach(function (cooldown) {
                            if (cooldown.getTimeLeft() > 0) {
                                timeLeft = cooldown.getTimeLeft();
                            }
                        });
                    }
                });
            }
        });
        return timeLeft;
    };
    CommandBase.prototype.setUserCooldown = function (guildId, userId) {
        var cooldowns = this._userCooldowns.get(guildId);
        if (!cooldowns)
            cooldowns = new Map();
        var userCooldowns = cooldowns.get(userId);
        if (!userCooldowns)
            userCooldowns = new Array();
        userCooldowns.push(new CommandCooldown_1.default(Date.now() + this._cooldown));
        cooldowns.set(userId, userCooldowns);
        this._userCooldowns.set(guildId, cooldowns);
    };
    return CommandBase;
}());
module.exports = CommandBase;

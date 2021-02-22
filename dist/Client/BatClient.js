"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var events_1 = require("events");
var CommandHandler_1 = __importDefault(require("../Command/CommandHandler"));
var EventHandler_1 = __importDefault(require("../Event/EventHandler"));
var GuildManager_1 = __importDefault(require("../Guild/GuildManager"));
var Utils_1 = __importDefault(require("../Utils/Utils"));
var Mongo_1 = __importStar(require("../Database/Mongo"));
var BatClient = /** @class */ (function (_super) {
    __extends(BatClient, _super);
    /**
     * @description Constructs the {BatClient} instance
     * @param {Client} client - Discord.JS Client
     * @param {IBatClientOptions} options - BatClient Options
     */
    function BatClient(client, options) {
        var _this = _super.call(this) || this;
        _this._showWarns = true;
        _this._defaultPrefix = '!';
        _this._eventsDirectory = 'events';
        _this._commandsDirectory = 'commands';
        _this._autoSaveInterval = 300000;
        _this._mongo = '';
        _this._mongoConnection = null;
        if (!client) {
            throw new Error('You must provide a Discord JS client as the first argument');
        }
        var _a = options.showWarns, showWarns = _a === void 0 ? true : _a, _b = options.commandsDirectory, commandsDirectory = _b === void 0 ? 'commands' : _b, _c = options.eventsDirectory, eventsDirectory = _c === void 0 ? 'events' : _c, _d = options.autoSaveInterval, autoSaveInterval = _d === void 0 ? 300000 : _d, databaseOptions = options.databaseOptions;
        if (module && require.main) {
            var path = require.main.path;
            if (path) {
                commandsDirectory = path + "\\" + (commandsDirectory || _this._commandsDirectory);
                eventsDirectory = path + "\\" + (eventsDirectory || _this._eventsDirectory);
            }
        }
        _this._showWarns = showWarns;
        _this._commandsDirectory = commandsDirectory;
        _this._eventsDirectory = eventsDirectory;
        _this._eventHandler = new EventHandler_1.default(_this, client);
        _this._commandHandler = new CommandHandler_1.default(_this, client);
        _this._guildManager = new GuildManager_1.default(_this);
        _this._autoSaveInterval = autoSaveInterval;
        _this._utils = new Utils_1.default();
        setTimeout(function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this._mongo) return [3 /*break*/, 2];
                        return [4 /*yield*/, Mongo_1.default(this._mongo, this, databaseOptions)];
                    case 1:
                        _a.sent();
                        this._mongoConnection = Mongo_1.getMongoConnection();
                        return [3 /*break*/, 3];
                    case 2:
                        if (showWarns) {
                            console.warn('WOKCommands > No MongoDB connection URI provided');
                        }
                        this.emit('databaseConnected', null, '');
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); }, 500);
        console.log('BatFramework > Successfully initialized');
        return _this;
    }
    Object.defineProperty(BatClient.prototype, "showWarns", {
        get: function () {
            return this._showWarns;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "defaultPrefix", {
        get: function () {
            return this._defaultPrefix;
        },
        enumerable: false,
        configurable: true
    });
    BatClient.prototype.setDefaultPrefix = function (prefix) {
        this._defaultPrefix = prefix;
    };
    Object.defineProperty(BatClient.prototype, "eventsDirectory", {
        get: function () {
            return this._eventsDirectory;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "eventHandler", {
        get: function () {
            return this._eventHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "commandsDirectory", {
        get: function () {
            return this._commandsDirectory;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "commandHandler", {
        get: function () {
            return this._commandHandler;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "guildManager", {
        get: function () {
            return this._guildManager;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "autoSaveInterval", {
        get: function () {
            return this._autoSaveInterval;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "utils", {
        get: function () {
            return this._utils;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BatClient.prototype, "mongoPath", {
        get: function () {
            return this._mongo;
        },
        enumerable: false,
        configurable: true
    });
    BatClient.prototype.setMongoPath = function (mongoPath) {
        this._mongo = mongoPath;
    };
    Object.defineProperty(BatClient.prototype, "mongoConnection", {
        get: function () {
            return this._mongoConnection;
        },
        enumerable: false,
        configurable: true
    });
    BatClient.prototype.isDBConnected = function () {
        var connection = this.mongoConnection;
        return !!(connection && connection.readyState === 1);
    };
    return BatClient;
}(events_1.EventEmitter));
module.exports = BatClient;

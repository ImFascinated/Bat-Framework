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
var Guild_1 = __importDefault(require("./Guild"));
var GuildSchema_1 = __importDefault(require("./GuildSchema"));
var GuildManager = /** @class */ (function () {
    /**
     * @description Constructs the {@link GuildManager} instance
     * @param {@link BatClient} instance - The main instance for BatClient.
     */
    function GuildManager(instance) {
        var _this = this;
        this._guilds = new Map();
        setInterval(function () {
            var before = Date.now();
            console.log("BatFramework > Saving " + _this._guilds.size + " guilds");
            _this._guilds.forEach(function (guild) { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, guild.save()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            }); });
            console.log("BatFramework > Saved guilds (took: " + (Date.now() - before) + "ms)");
        }, instance.autoSaveInterval);
    }
    /**
     * @description Loads the guild with the provided id into the _guild Map
     * @param {@link BatClient} instance - The main instance for BatClient.
     * @param {@link string} id - Guild id
     * @private
     */
    GuildManager.prototype.loadGuild = function (instance, id) {
        return __awaiter(this, void 0, void 0, function () {
            var data, guild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GuildSchema_1.default.findOne({ id: id })];
                    case 1:
                        data = _a.sent();
                        if (!(data === undefined)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.createGuild(instance, id)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, GuildSchema_1.default.findOne({ id: id })];
                    case 3:
                        data = _a.sent();
                        _a.label = 4;
                    case 4:
                        if (data === null)
                            return [2 /*return*/];
                        guild = new Guild_1.default(id);
                        data.get('data').forEach(function (data) {
                            guild.setData(data.key, data.value);
                        });
                        this._guilds.set(id, guild);
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Inserts the {@link Guild} into the database if it doesn't exist in the _guilds Map
     * @param instance - The main instance for BatClient.
     * @param id - Guild id
     */
    GuildManager.prototype.createGuild = function (instance, id) {
        return __awaiter(this, void 0, void 0, function () {
            var guild;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this._guilds.has(id)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.loadGuild(instance, id)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (this._guilds.has(id)) {
                            return [2 /*return*/];
                        }
                        guild = new Guild_1.default(id);
                        return [4 /*yield*/, guild.setData('prefix', instance.defaultPrefix)];
                    case 3:
                        _a.sent();
                        this._guilds.set(id, guild);
                        return [4 /*yield*/, GuildSchema_1.default.findOne({ id: id }, function (err, data) {
                                if (err)
                                    console.log(err);
                                if (!data) {
                                    var toSave = new GuildSchema_1.default({
                                        id: id,
                                        data: []
                                    });
                                    return toSave.save();
                                }
                            })];
                    case 4:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @description Gets the provided guilds {@link Guild} object and then returns it
     * @param id
     */
    GuildManager.prototype.getGuild = function (id) {
        return this._guilds.get(id);
    };
    return GuildManager;
}());
module.exports = GuildManager;

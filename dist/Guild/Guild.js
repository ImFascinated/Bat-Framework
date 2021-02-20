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
var GuildSchema_1 = __importDefault(require("./GuildSchema"));
var Guild = /** @class */ (function () {
    /**
     * @description Constructs the {Guild} instance
     * @param {string} id - Guild id
     */
    function Guild(id) {
        this._data = new Map();
        this._id = id;
    }
    /**
     * @description Sets data in the {Guild} object
     * @param {string} key - The data name (example: prefix)
     * @param {string} value - The data to be stored (example: !)
     * @param {boolean} forceSave - Whether to force save the guild and not wait for the auto save to save it
     */
    Guild.prototype.setData = function (key, value, forceSave) {
        return __awaiter(this, void 0, void 0, function () {
            var promise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        promise = new Promise(function (resolve, reject) {
                            _this._data.set(key, value);
                            resolve({ key: key, value: value });
                        });
                        if (!forceSave) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.save(forceSave)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, promise];
                }
            });
        });
    };
    /**
     * @description Returns a {Object} from the provided key
     * @param {string} key - Key for the data you are trying to get
     * @returns Object
     */
    Guild.prototype.getData = function (key) {
        return this._data.get(key);
    };
    /**
     * @description Saves the guild into the database
     * @param {boolean} log - Whether to log that the guild has saved
     */
    Guild.prototype.save = function (log) {
        return __awaiter(this, void 0, void 0, function () {
            var data, updateData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, GuildSchema_1.default.findOne({ id: this._id })];
                    case 1:
                        data = _a.sent();
                        updateData = [];
                        this._data.forEach(function (key, value) {
                            updateData.push({ key: value, value: key });
                        });
                        data.data = updateData;
                        data.markModified('data');
                        data.save();
                        if (log) {
                            console.log("BatFramework > Force saved guild \"" + this._id + "\"");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    Object.defineProperty(Guild.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: false,
        configurable: true
    });
    return Guild;
}());
module.exports = Guild;

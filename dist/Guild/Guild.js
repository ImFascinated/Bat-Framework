"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const GuildSchema_1 = __importDefault(require("./GuildSchema"));
class Guild {
    /**
     * @description Constructs the {Guild} instancee
     * @param {string} id - Guild id
     */
    constructor(id, instance, options) {
        this._data = new Map();
        this._id = id;
        let { prefix = instance.defaultPrefix, disabledCommands = new Array() } = options;
        this._prefix = prefix;
        this._disabledCommands = disabledCommands;
    }
    /**
     * @description Sets data in the {Guild} object
     * @param {string} key - The data name (example: prefix)
     * @param {string} value - The data to be stored (example: !)
     * @param {boolean} forceSave - Whether to force save the guild and not wait for the auto save to save it
     */
    async setData(key, value, forceSave) {
        let promise;
        promise = new Promise((resolve, reject) => {
            this._data.set(key, value);
            resolve({ key: key, value: value });
        });
        if (forceSave) {
            await this.save(forceSave);
        }
        return promise;
    }
    /**
     * @description Returns a {Object} from the provided key
     * @param {string} key - Key for the data you are trying to get
     * @returns Object
     */
    getData(key) {
        return this._data.get(key);
    }
    /**
     * @description Saves the guild into the database
     * @param {boolean} log - Whether to log that the guild has saved
     */
    async save(log) {
        let data = await GuildSchema_1.default.findOne({ id: this._id });
        let updateData = [];
        this._data.forEach((key, value) => {
            updateData.push({ key: value, value: key });
        });
        data.prefix = this._prefix;
        data.disabledCommands = this._disabledCommands;
        data.data = updateData;
        data.markModified('prefix');
        data.markModified('disabledCommands');
        data.markModified('data');
        data.save();
        if (log) {
            console.log(`BatFramework > Force saved guild "${this._id}"`);
        }
    }
    get id() {
        return this._id;
    }
    get prefix() {
        return this._prefix;
    }
    setPrefix(prefix) {
        this._prefix = prefix;
    }
    disableCommand(command) {
        this._disabledCommands.push(command.name);
    }
    enableCommand(command) {
        const toKeep = new Array();
        this._disabledCommands.forEach(cmd => {
            if (cmd !== command.name)
                return;
            toKeep.push(cmd);
        });
        this._disabledCommands = toKeep;
    }
    isCommandEnabled(command) {
        let isEnabled = true;
        this._disabledCommands.forEach(cmd => {
            if (cmd == command.name) {
                isEnabled = false;
                return isEnabled;
            }
        });
        return isEnabled;
    }
}
module.exports = Guild;

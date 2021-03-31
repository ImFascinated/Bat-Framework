"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const Guild_1 = __importDefault(require("./Guild"));
const GuildSchema_1 = __importDefault(require("./GuildSchema"));
class GuildManager {
    /**
     * @description Constructs the {GuildManager} instance
     * @param {BatClient} instance - The main instance for BatClient.
     */
    constructor(instance, client) {
        this._guilds = new Map();
        instance.on('databaseConnected', async () => {
            if (instance.forceLoadGuilds) {
                const data = await GuildSchema_1.default.find();
                data.forEach(data => {
                    if (data === null)
                        return;
                    const guild = new Guild_1.default(data.id, instance, {
                        prefix: instance.defaultPrefix,
                        disabledCommands: new Array()
                    });
                    data.get('data').forEach((data) => {
                        guild.setData(data.key, data.value);
                    });
                    this._guilds.set(data.id, guild);
                });
                console.log(`BatFramework > Force loaded ${data.length} guild${data.length > 1 ? 's' : ''}`);
            }
        });
        setInterval(() => {
            const before = Date.now();
            console.log(`BatFramework > Saving ${this._guilds.size} guild${this._guilds.size > 1 ? 's' : ''}`);
            this._guilds.forEach(async (guild) => {
                await guild.save();
            });
            console.log(`BatFramework > Saved guild${this._guilds.size > 1 ? 's' : ''} (took: ${Date.now() - before}ms)`);
        }, instance.autoSaveInterval);
    }
    /**
     * @description Loads the guild with the provided id into the _guild Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {string} id - Guild id
     * @private
     */
    async loadGuild(instance, id) {
        let data = await GuildSchema_1.default.findOne({ id: id });
        if (data === undefined) {
            await this.createGuild(instance, id);
            data = await GuildSchema_1.default.findOne({ id: id });
        }
        if (data === null)
            return;
        const guild = new Guild_1.default(id, instance, {
            prefix: data.get('prefix'),
            disabledCommands: data.get('disabledCommands')
        });
        data.get('data').forEach((data) => {
            guild.setData(data.key, data.value);
        });
        this._guilds.set(id, guild);
    }
    /**
     * @description Inserts the {Guild} into the database if it doesn't exist in the _guilds Map
     * @param {BatClient} instance - The main instance for BatClient.
     * @param {string} id - Guild id
     */
    async createGuild(instance, id) {
        if (!this._guilds.has(id)) {
            await this.loadGuild(instance, id);
        }
        if (this._guilds.has(id)) {
            return;
        }
        const guild = new Guild_1.default(id, instance, {
            prefix: instance.defaultPrefix,
            disabledCommands: new Array()
        });
        await guild.setData('prefix', instance.defaultPrefix);
        this._guilds.set(id, guild);
        await GuildSchema_1.default.findOne({ id: id }, (err, data) => {
            if (err)
                console.log(err);
            if (!data) {
                const toSave = new GuildSchema_1.default({
                    id: id,
                    prefix: instance.defaultPrefix,
                    disabledCommands: new Array(),
                    data: []
                });
                return toSave.save();
            }
        });
    }
    /**
     * @description Gets the provided guilds {Guild} object and then returns it
     * @param {string} id - Guild id
     * @returns Guild
     */
    getGuild(id) {
        return this._guilds.get(id);
    }
}
module.exports = GuildManager;

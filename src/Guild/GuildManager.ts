import { Client } from 'discord.js';
import BatClient from '../Client/BatClient';
import Guild from './Guild';
import GuildSchema from './GuildSchema';

class GuildManager {
	private _guilds: Map<String, Guild> = new Map();

	/**
	 * @description Constructs the {GuildManager} instance
	 * @param {BatClient} instance - The main instance for BatClient.
	 */

	constructor(instance: BatClient, client: Client) {
		instance.on('databaseConnected', async () => {
			if (instance.forceLoadGuilds) {
				const data = await GuildSchema.find();
				data.forEach(data => {
					if (data === null) return;
					const guild = new Guild(data.id, instance, {
						prefix: instance.defaultPrefix,
						disabledCommands: new Array<String>()
					});
					data.get('data').forEach((data: { key: string; value: Object }) => {
						guild.setData(data.key, data.value);
					})
					this._guilds.set(data.id, guild);
				})
				console.log(`BatFramework > Force loaded ${data.length} guild${data.length > 1 ? 's' : ''}`);
			}
		})

		setInterval(() => {
			const before = Date.now();
			console.log(`BatFramework > Saving ${this._guilds.size} guild${this._guilds.size > 1 ? 's' : ''}`);
			this._guilds.forEach(async (guild) => {
				await guild.save();
			});
			console.log(`BatFramework > Saved guild${this._guilds.size > 1 ? 's' : ''} (took: ${Date.now() - before}ms)`);
		}, instance.autoSaveInterval)
	}

	/**
	 * @description Loads the guild with the provided id into the _guild Map
	 * @param {BatClient} instance - The main instance for BatClient.
	 * @param {string} id - Guild id
	 * @private
	 */

	private async loadGuild(instance: BatClient, id: string) {
		let data = await GuildSchema.findOne({ id: id });
		if (data === undefined) {
			await this.createGuild(instance, id);
			data = await GuildSchema.findOne({ id: id });
		}
		if (data === null) return;
		const guild = new Guild(id, instance, {
			prefix: data.get('prefix'),
			disabledCommands: data.get('disabledCommands')
		});
		data.get('data').forEach((data: { key: string; value: Object }) => {
			guild.setData(data.key, data.value);
		})
		this._guilds.set(id, guild);
	}

	/**
	 * @description Inserts the {Guild} into the database if it doesn't exist in the _guilds Map
	 * @param {BatClient} instance - The main instance for BatClient.
	 * @param {string} id - Guild id
	 */

	public async createGuild(instance: BatClient, id: string) {
		if (!this._guilds.has(id)) {
			await this.loadGuild(instance, id);
		}
		if (this._guilds.has(id)) {
			return;
		}
		const guild = new Guild(id, instance, {
			prefix: instance.defaultPrefix,
			disabledCommands: new Array<String>()
		});
		await guild.setData('prefix', instance.defaultPrefix);

		this._guilds.set(id, guild);

		await GuildSchema.findOne({ id: id }, (err: any, data: any) => {
			if (err) console.log(err);

			if (!data) {
				const toSave = new GuildSchema({
					id: id,
					prefix: instance.defaultPrefix,
					disabledCommands: new Array<String>(),
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

	public getGuild(id: string): Guild | undefined {
		return this._guilds.get(id);
	}
}

export = GuildManager;

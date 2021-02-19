import BatClient from '../BatClient';
import Guild from './Guild';
import GuildSchema from './GuildSchema';

class GuildManager {
	private _guilds: Map<String, Guild> = new Map();

	constructor(instance: BatClient) {
		setInterval(() => {
			const before = Date.now();
			console.log(`BatFramework > Saving ${this._guilds.size} guilds`);
			this._guilds.forEach(async (guild) => {
				await guild.save();
			});
			console.log(`BatFramework > Saved guilds (took: ${Date.now() - before}ms)`);
		}, instance.autoSaveInterval)
	}

	private async loadGuild(instance: BatClient, id: string) {
		let data = await GuildSchema.findOne({ id: id });
		if (data === undefined) {
			await this.createGuild(instance, id);
			data = await GuildSchema.findOne({ id: id });
		}
		if (data === null) return;
		const guild = new Guild(id);
		data.get('data').forEach((data: { key: string; value: Object }) => {
			guild.setData(data.key, data.value);
		})
		this._guilds.set(id, guild);
	}

	public async createGuild(instance: BatClient, id: string) {
		if (!this._guilds.has(id)) {
			this.loadGuild(instance, id);
		}
		if (this._guilds.has(id)) {
			return;
		}
		const guild: Guild = new Guild(id);
		guild.setData('prefix', instance.defaultPrefix);

		this._guilds.set(id, guild);

		await GuildSchema.findOne({ id: id }, (err: any, data: any) => {
			if (err) console.log(err);

			if (!data) {
				const toSave = new GuildSchema({
					id: id,
					data: []
				});
				return toSave.save();
			}
		});
	}

	public getGuild(id: string): Guild | undefined {
		return this._guilds.get(id);
	}
}

export = GuildManager;
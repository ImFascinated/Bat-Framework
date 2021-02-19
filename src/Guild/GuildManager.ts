import Guild from './Guild';
import GuildSchema from './GuildSchema';

class GuildManager {
	private _guilds: Map<String, Guild> = new Map();

	constructor() {
		setInterval(() => {
			console.log(`BatFramework > Saving ${this._guilds.size} guilds.`)
			this._guilds.forEach(guild => {
				guild.save();
			});
			console.log(`BatFramework > Saved guilds.`)
		}, 300000) // 5 Mins
	}

	private async loadGuild(id: string) {
		let data = await GuildSchema.findOne({ id: id });
		if (data === undefined) {
			await this.createGuild(id);
			data = await GuildSchema.findOne({ id: id });
		}
		if (data === null) return;
		const guild = new Guild(id);
		data.get('data').forEach((data: { key: string; value: Object; }) => {
			guild.setData(data.key, data.value);
		})
		this._guilds.set(id, guild);
	}

	public async createGuild(id: string) {
		if (!this._guilds.has(id)) {
			this.loadGuild(id);
		}
		if (this._guilds.has(id)) {
			return;
		}
		const guild: Guild = new Guild(id);
		guild.setData('prefix', '!');

		this._guilds.set(id, guild);

		await GuildSchema.findOne({ id: id }, (err: any, data: any) => {
			if (err) console.log(err);

			if (!data) {
				const toSave = new GuildSchema({
					id: id,
					data: []
				});
				console.log(`Created guild: id=\`${id}\``);
				return toSave.save();
			}
		});
	}

	public getGuild(id: string): Guild | undefined {
		return this._guilds.get(id);
	}
}

export = GuildManager;
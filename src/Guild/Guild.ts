import GuildSchema from './GuildSchema';

class Guild {
	private _id: string;
	private _data: Map<String, Object> = new Map();

	constructor(id: string) {
		this._id = id;
	}

	/**
 	 * @description Sets data in the {@link Guild} object
	 * @param key - The data name (example: prefix)
	 * @param value - The data to be stored (example: !)
	 * @param forceSave - Whether to force save the guild and not wait for the auto save to save it
	 */

	public async setData(key: string, value: Object, forceSave?: boolean): Promise<any> {
		let promise;
		promise = new Promise((resolve, reject) => {
			this._data.set(key, value);
			resolve({ key: key, value: value });
		})
		if (forceSave) {
			await this.save(forceSave);
		}
		return promise;
	}

	public getData(id: string): Object | undefined {
		return this._data.get(id);
	}

	/**
	 * @description Saves the guild into the database
	 * @param log - Whether to log that the guild has saved
	 */

	public async save(log?: boolean) {
		let data: any = await GuildSchema.findOne({ id: this._id });

		let updateData: { key: Object; value: Object; }[] = [];
		this._data.forEach((key, value) => {
			updateData.push({ key: value, value: key });
		});
		data.data = updateData;
		data.markModified('data');
		data.save();
		if (log) {
			console.log(`BatFramework > Force saved guild "${this._id}"`)
		}
	}

	public get id(): string {
		return this._id;
	}
}

export = Guild;

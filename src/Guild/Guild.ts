import GuildSchema from './GuildSchema';

class Guild {
	private _id: string;
	private _data: Map<String, Object> = new Map();

	/**
	 * @description Constructs the {Guild} instance
	 * @param {string} id - Guild id
	 */

	constructor(id: string) {
		this._id = id;
	}

	/**
 	 * @description Sets data in the {Guild} object
	 * @param {string} key - The data name (example: prefix)
	 * @param {string} value - The data to be stored (example: !)
	 * @param {boolean} forceSave - Whether to force save the guild and not wait for the auto save to save it
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

	/**
	 * @description Returns a {Object} from the provided key
	 * @param {string} key - Key for the data you are trying to get
	 * @returns Object
	 */

	public getData(key: string): Object | undefined {
		return this._data.get(key);
	}

	/**
	 * @description Saves the guild into the database
	 * @param {boolean} log - Whether to log that the guild has saved
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

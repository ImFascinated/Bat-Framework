import BatClient from "../BatClient";
import GuildSchema from './GuildSchema';

class Guild {
	private _id: string;
	private _data: Map<String, Object> = new Map();

	constructor(id: string) {
		this._id = id;
	}

	public get id(): string {
		return this._id;
	}

	public async setData(key: string, value: Object) {
		return new Promise((resolve, reject) => {
			this._data.set(key, value);
			resolve({ key: key, value: value });
		})
	}

	public getData(id: string): Object | undefined {
		return this._data.get(id);
	}

	public async save() {
		let data: any = await GuildSchema.findOne({ id: this._id });

		let updateData: { key: Object; value: Object; }[] = [];
		this._data.forEach((key, value) => {
			updateData.push({ key: key, value: value });
		});
		data.data = updateData;
		data.markModified('data');
		data.save();
	}
}

export = Guild;
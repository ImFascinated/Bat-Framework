import BatClient from "../BatClient";

type Options = {
	type?: string,
	once: boolean,
	emitter: any
}

class EventBase {
	private _type: string = 'on';
	private _once: boolean = false;
	private _emitter: any

	constructor(options: Options) {
		let {
			type = 'on',
			once = false,
		} = options;

		this._type = type;
		this._once = once;
	}

	public run(instance: BatClient, ...args: any) {
		throw new Error(`The event ${this._type} is missing the run method`);
	}

	public get type(): string {
		return this._type;
	}

	public get once(): boolean {
		return this._once;
	}

	public get emitter(): any {
		return this._emitter;
	}
}

export = EventBase;
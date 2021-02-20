import BatClient from "../BatClient";

type Options = {
	event?: string,
	type?: string,
	once?: boolean
}

class EventBase {
	private _event: string = '';
	private _type: string = 'on';
	private _once: boolean = false;

	constructor(options: Options) {
		let {
			event = '',
			type = 'on',
			once = false,
		} = options;

		this._event = event;
		this._type = type;
		this._once = once;
	}

	public run(instance: BatClient, ...args: any) {
		throw new Error(`The event ${this._type} is missing the run method`);
	}

	public get event(): string {
		return this._event;
	}

	public get type(): string {
		return this._type;
	}

	public get once(): boolean {
		return this._once;
	}
}

export = EventBase;
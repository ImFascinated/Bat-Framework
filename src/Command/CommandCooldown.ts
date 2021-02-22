export default class CommandCooldown {
	private _endTime: number;
	
	constructor(endTime: number) {
		this._endTime = endTime;
	}

	public getTimeLeft(): number {
		return this._endTime - Date.now();
	}
}
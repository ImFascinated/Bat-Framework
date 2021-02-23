export default class CommandCooldown {
    private _endTime;
    constructor(endTime: number);
    getTimeLeft(): number;
}

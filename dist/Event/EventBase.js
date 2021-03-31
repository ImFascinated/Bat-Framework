"use strict";
class EventBase {
    /**
    * @param {IEventOptions} options
    */
    constructor(options) {
        this._event = '';
        this._type = 'on';
        let { event = '', type = 'on' } = options;
        this._event = event;
        this._type = type;
    }
    /**
     * @param {BatClient} instance
     * @param {Client} client
     * @param {string[]} args
     */
    run(instance, client, ...args) {
        throw new Error(`The event ${this._type} is missing the run method`);
    }
    get event() {
        return this._event;
    }
    get type() {
        return this._type;
    }
}
module.exports = EventBase;

const { BatClient, EventBase } = require('../../dist/index');

module.exports = class ReadyEvent extends EventBase {
    constructor(...args) {
        super(...args);
	}
	
	/**
	 * 
	 * @param {BatClient} instance 
	 */

	run(instance) {
		console.log(`Bot » Ready!`)
    }
}
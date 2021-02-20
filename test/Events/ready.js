const { BatClient, EventBase } = require('../../dist/index');

module.exports = class ReadyEvent extends EventBase {
    constructor() {
		super({
			event: 'ready'
		});
	}
	
	/**
	 * 
	 * @param {BatClient} instance 
	 */

	run(instance) {
		console.log(`Bot » Ready!`);
    }
}
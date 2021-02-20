const { Message } = require('discord.js');
const { BatClient, EventBase } = require('../../dist/index');

module.exports = class MessageEvent extends EventBase {
    constructor() {
        super({
			event: 'message'
		});
	}
	
	/**
	 * 
	 * @param {BatClient} instance 
	 * @param {Message} message 
	 */

	run(instance, message) {
		console.log(`Message: ${message.content}`)
    }
}
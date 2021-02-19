const { EventBase } = require('../../dist/index');

module.exports = class MessageEvent extends EventBase {
    constructor(...args) {
        super(...args);
    }

	run(instance, message) {
    }
}
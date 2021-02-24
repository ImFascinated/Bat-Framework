import mongoose from 'mongoose';

/**
 * @description Guild Schema
 */

const schema = new mongoose.Schema({
	id: String,
	prefix: String,
	disabledCommands: Array,
	data: Array
});

export = mongoose.model('batframework-guilds', schema);

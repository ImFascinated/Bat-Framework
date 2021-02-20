import mongoose from 'mongoose';

/**
 * @description Guild Schema
 */

const schema = new mongoose.Schema({
	id: String,
	data: Array
});

export = mongoose.model('batframework-guilds', schema);

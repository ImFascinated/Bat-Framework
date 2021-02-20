import mongoose from 'mongoose';

const schema = new mongoose.Schema({
	id: String,
	data: Array
});

export = mongoose.model('batframework-guilds', schema);

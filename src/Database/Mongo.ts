import mongoose, { Connection } from 'mongoose'
import BatClient from '../Client/BatClient'

const results: {
	[name: number]: string
} = {
	0: 'Disconnected',
	1: 'Connected',
	2: 'Connecting',
	3: 'Disconnecting',
}

const Mongo = async (
	mongoPath: string,
	instance: BatClient,
	dbOptions = {}
) => {
	await mongoose.connect(mongoPath, {
		keepAlive: true,
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		...dbOptions,
	})

	const { connection } = mongoose
	const state = results[connection.readyState] || 'Unknown'
	instance.emit('databaseConnected', connection, state)
}

export const getMongoConnection = (): Connection => {
	return mongoose.connection
}

export default Mongo
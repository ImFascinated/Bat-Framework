export default interface IBatClientOptions {
	commandsDirectory?: string
	eventsDirectory?: string
	featuresDirectory?: string
	showWarns?: boolean
	autoSaveInterval?: number
	databaseOptions?: {}
	forceLoadGuilds?: boolean
	botOwners?: Array<String>
}
export default interface IBatClientOptions {
	commandsDirectory?: string
	eventsDirectory?: string
	showWarns?: boolean
	autoSaveInterval?: number
	databaseOptions?: {}
	forceLoadGuilds?: boolean
}
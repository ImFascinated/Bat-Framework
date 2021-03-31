import { PermissionString } from "discord.js";

export default interface ICommandOptions {
	name?: string
	aliases?: string[]
	description?: string
	usage?: string
	category?: string
	clientPermissions?: Array<PermissionString>
	userPermissions?: Array<PermissionString>
	cooldown?: number
	botOwnerOnly?: boolean
}
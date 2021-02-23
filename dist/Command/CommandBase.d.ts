import { Client, Message, PermissionString } from "discord.js";
import BatClient from "../Client/BatClient";
import Guild from '../Guild/Guild';
import ICommandOptions from "./ICommandOptions";
declare class CommandBase {
    private _name;
    private _aliases;
    private _description;
    private _usage;
    private _category;
    private _clientPermissions;
    private _userPermissions;
    private _cooldown;
    private _userCooldowns;
    /**
     * @param {ICommandOptions} options
     */
    constructor(options: ICommandOptions);
    /**
     * @param {Message} message
     * @param {string[]} args
     * @param {Guild} guildData
     */
    run(instance: BatClient, client: Client, message: Message, args: string[], guildData: Guild): Promise<void>;
    get name(): string;
    get aliases(): string[];
    get description(): string;
    get usage(): string;
    get category(): string;
    get clientPermissions(): Array<PermissionString> | undefined;
    get userPermissions(): Array<PermissionString> | undefined;
    get cooldown(): number;
    getUserCooldown(guildId: string, userId: string): number;
    setUserCooldown(guildId: string, userId: string): void;
}
export = CommandBase;

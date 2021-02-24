import { Client, Message } from "discord.js";
import BatClient from "../../../Client/BatClient";
import Guild from "../../../Guild/Guild";
import CommandBase from "../../CommandBase";
declare class Command extends CommandBase {
    constructor();
    run(instance: BatClient, client: Client, message: Message, args: string[], guildData: Guild): Promise<void>;
}
export = Command;

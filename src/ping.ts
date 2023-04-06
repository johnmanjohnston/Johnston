import Discord from "discord.js";  

export function ping(msg: Discord.Message, args: string[]) {
    msg.reply("Pong!");
}

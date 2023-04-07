import Discord from "discord.js";  

export async function ping(msg: Discord.Message, args: string[]) {
    msg.reply("Pong!");
}

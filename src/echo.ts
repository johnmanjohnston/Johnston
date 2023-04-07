import Discord from "discord.js";  

export async function echo(msg: Discord.Message, args: string[]) {
    msg.reply(msg.content.slice(5)); // 5 = length of "echo" + 1 (1 accounting for the space)
}

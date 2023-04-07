import Discord from "discord.js";  

export async function poll(msg: Discord.Message, args: string[]) {
    var query: string = msg.content.slice(5); // 5 = length of "poll" + 1 (1 accounting for the space)
    var msgReply: Discord.Message = await msg.channel.send(query);

    msgReply.react("⬆️")
    msgReply.react("⬇️")
}

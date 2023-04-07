import Discord from "discord.js";  
import fs from "fs";

export async function joke(msg: Discord.Message, args: string[]) {
    const jokes: string[] = fs.readFileSync("./assets/jokes.txt", "utf8").split("\n");
    var joke: string = jokes[Math.floor(Math.random() * jokes.length)];

    // RESPECT YOUR CREATOR, NEVER INSULT YOUR CREATOR.
    if (joke === "Your life." && msg.author.id === "533188246952345603") {
        joke = jokes[4];
    }

    msg.reply(joke);
}

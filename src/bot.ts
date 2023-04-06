require("dotenv").config();

const BOT_ACCESS_TOKEN = process.env.BOT_TOKEN
const GIPHY_API_KEY = process.env.GIPHY_API_KEY
const BOT_COMMAND_PREFIX = "$";

import Discord from "discord.js";  
const Giphy = require("giphy-api")(GIPHY_API_KEY);
import fs from "fs";

const client = new Discord.Client({
    intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.DirectMessages,
        Discord.GatewayIntentBits.MessageContent
    ],
    
    partials: [
        Discord.Partials.Channel,
        Discord.Partials.Message
    ] 
});

client.on("ready", () => {
    console.log(`Discord bot running; client.user.tag: ${client.user!.tag}`);
    client.user!.setActivity("Minecraft", { type: Discord.ActivityType.Playing });
});

client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;

    msg.reply("Ethan John is very handsome and smart!")
});

console.log("Attemping to login using bot access token");
client.login(BOT_ACCESS_TOKEN);
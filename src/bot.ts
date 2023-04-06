require("dotenv").config();

const BOT_ACCESS_TOKEN = process.env.BOT_TOKEN
const GIPHY_API_KEY = process.env.GIPHY_API_KEY
const BOT_COMMAND_PREFIX = "$";

import Discord from "discord.js";  
const Giphy = require("giphy-api")(GIPHY_API_KEY);
import fs from "fs";

import { ping } from "./ping";
import { echo } from "./echo";

const FUNCTION_MAP: { [key: string]: Function } = {
    "ping": ping,
    "echo": echo
}


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
    client.user!.setActivity("Johnston", { type: Discord.ActivityType.Playing });
});

client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;

    if (msg.content.startsWith(BOT_COMMAND_PREFIX)) {
        const args: string[] = msg.content.replace(BOT_COMMAND_PREFIX, "").split(" ");
        const command: string = args[0];

        var cmdFunction = FUNCTION_MAP[command];
        if (cmdFunction != null)
            cmdFunction(msg, args);
    }
});

console.log("Attemping to login using bot access token");
client.login(BOT_ACCESS_TOKEN);
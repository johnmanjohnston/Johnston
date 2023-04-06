"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
const BOT_ACCESS_TOKEN = process.env.BOT_TOKEN;
const GIPHY_API_KEY = process.env.GIPHY_API_KEY;
const BOT_COMMAND_PREFIX = "$";
const discord_js_1 = __importDefault(require("discord.js"));
const Giphy = require("giphy-api")(GIPHY_API_KEY);
const ping_1 = require("./ping");
const echo_1 = require("./echo");
const FUNCTION_MAP = {
    "ping": ping_1.ping,
    "echo": echo_1.echo
};
const client = new discord_js_1.default.Client({
    intents: [
        discord_js_1.default.GatewayIntentBits.Guilds,
        discord_js_1.default.GatewayIntentBits.GuildMessages,
        discord_js_1.default.GatewayIntentBits.DirectMessages,
        discord_js_1.default.GatewayIntentBits.MessageContent
    ],
    partials: [
        discord_js_1.default.Partials.Channel,
        discord_js_1.default.Partials.Message
    ]
});
client.on("ready", () => {
    console.log(`Discord bot running; client.user.tag: ${client.user.tag}`);
    client.user.setActivity("Johnston", { type: discord_js_1.default.ActivityType.Playing });
});
client.on("messageCreate", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    if (msg.author.bot)
        return;
    if (msg.content.startsWith(BOT_COMMAND_PREFIX)) {
        const args = msg.content.replace(BOT_COMMAND_PREFIX, "").split(" ");
        const command = args[0];
        var cmdFunction = FUNCTION_MAP[command];
        if (cmdFunction != null)
            cmdFunction(msg, args);
    }
}));
console.log("Attemping to login using bot access token");
client.login(BOT_ACCESS_TOKEN);

require('dotenv').config();
console.log("Running...")

// Important variables
const BOT_ACCESS_TOKEN = process.env.BOT_TOKEN
const GIPHY_API_KEY = process.env.GIPHY_API_KEY
const BOT_COMMAND_PREFIX = "$";

// Modules
const Discord = require("discord.js");  
const Giphy = require("giphy-api")(GIPHY_API_KEY);
const fs = require("fs");

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
    console.log(`Discord bot running; client.user.tag: ${client.user.tag}`);
    client.user.setActivity("Minecraft", { type: "PLAYING" });
});


client.on("messageCreate", async (msg) => {
    if (msg.author.bot) return;

    if (msg.content.toLowerCase() === "e") msg.reply("e");

    if (msg.content.startsWith(BOT_COMMAND_PREFIX)) {
        const fullCommand = msg.content.replace(BOT_COMMAND_PREFIX, "");
        const args = fullCommand.split(" ");

        const command = args[0];
        
        // Help command
        if (command === "help") {
            msg.reply(`
Welcome to **Johnston**! A Discord bot with commands that make your server more fun to use.
The commands available for the bot are as follows:

> ${BOT_COMMAND_PREFIX}help — different commands useable by the bot, also this message!
> ${BOT_COMMAND_PREFIX}ping — replies with "Pong!"
> ${BOT_COMMAND_PREFIX}avatar — displays your avatar
> ${BOT_COMMAND_PREFIX}echo \`<echo>\` — Replies with everything after the "${BOT_COMMAND_PREFIX}echo "
> ${BOT_COMMAND_PREFIX}joke — replies with a random joke (alias: \`${BOT_COMMAND_PREFIX}pun\`)
> ${BOT_COMMAND_PREFIX}punch \`@<user>\` — displays a GIF (from GIPHY) of a person punching another person and displays a caption
> ${BOT_COMMAND_PREFIX}membercount — displays the number of members in the server
> ${BOT_COMMAND_PREFIX}purge \`<msgcount>\` — deletes the last <msgcount> messages, if the user has adequate permissions (alias: \`${BOT_COMMAND_PREFIX}massdelete\`)
> ${BOT_COMMAND_PREFIX}poll \`<question>\` — creates a poll with the question and the users can vote with a tick, or a cross
> ${BOT_COMMAND_PREFIX}gif \`<query>\` — displays a GIF (from GIPHY) based on the query
> ${BOT_COMMAND_PREFIX}kick \`@<user>\` — kicks the user from the server
> ${BOT_COMMAND_PREFIX}ban \`@<user>\` — bans the user from the server (alias: \`${BOT_COMMAND_PREFIX}yeet\`)
The command prefix for all commands, is "${BOT_COMMAND_PREFIX}"`);}

        // Ping command
        if (command === `ping`) {
            msg.reply("Pong!");
        }

        // Avatar command
        if (command === "avatar") {
            const avatar = msg.author.displayAvatarURL();
            const embed = new Discord.MessageEmbed();
            embed.setTitle("Avatar");   
            embed.setColor("#DEDEDE");
            embed.setThumbnail(avatar);
            embed.setImage(avatar);
            embed.setTimestamp();
            
            msg.reply({ embeds: [embed] });
        }

        // Echo command
        if (command === "echo") {
            var echo = args.slice(1).join(" ");

            if (!echo) {
                msg.reply(`Format: ${BOT_COMMAND_PREFIX}\`echo: <echo>\``);
                return;
            }

            if (echo.includes("@everyone") || echo.includes("@here")) {
                msg.reply("Avoid using `@everyone` or `@here` in your echo commands.");
                return;
            }

            msg.reply(echo);
        }

        // Joke command
        if (command === "joke" || command === "pun") {
            const jokes = fs.readFileSync("./assets/jokes.txt", "utf8").split("\n");
            const joke = jokes[Math.floor(Math.random() * jokes.length)];
            msg.reply(joke);
        }

        // Punch command
        if (command === "punch") {
            const punchurls = fs.readFileSync("./assets/punchurls.txt", "utf8").split("\n");
            const punchurl = punchurls[Math.floor(Math.random() * punchurls.length)];
            
            const user = msg.mentions.users.first();

            if (!user) {
                msg.reply(`You need to mention someone to punch! Format: ${BOT_COMMAND_PREFIX}\`punch @<user>\``);
                return;
            }

            if (user.id === msg.author.id) {
                msg.reply(`${msg.author} absolutely punched THEMSELF!\n\n${punchurl}`)
                return;
            }

            if (user.id === client.user.id) {
                msg.reply("You dare to punch me? You absolute weakling. I'd scotch you within a second if you tried.");
                return;
            }

            msg.reply(`${msg.author} absolutely punched ${user}!\n\n${punchurl}`)
        }

        // Member count command
        if (command === "membercount") {
            const memberCount = msg.guild.memberCount;
            msg.reply(`Member count: ${memberCount}`);
        }
        
        // Message purge command
        if (command === "purge" || command === "massdelete") {
            var msgcount = args[1];

            if (msgcount === "0") {
                msg.reply("You cannot just delete zero messages.");
                return;
            }

            msgcount = parseInt(msgcount);

            if (!msgcount || msgcount === NaN) {
                msg.reply("Format: `$purge <msgcount>`");
                return;
            }

            if (msgcount > 99) {
                msg.reply("You may only purge up to 99 messages at once.");
                return;
            }

            if (msgcount <= 0) {
                msg.reply("You can't delete less than 0 messages.");
                return;
            }
            
            // Check if the user has privileges to delete messages
            if (msg.member.permissions.has("MANAGE_MESSAGES")) {
                msg.channel.bulkDelete(msgcount + 1); // Add one to delete the message the user just sent 
                msg.reply(`${msg.author} deleted ${msgcount} message(s).`);
            } else {
                msg.reply("You don't inherit the required permission to delete messages.");
            }
        }

        // Poll commands
        if (command === "poll") {
            const question = msg.content.replace(`${BOT_COMMAND_PREFIX}poll `, "");

            var pollmsg = await msg.reply(question);

            await pollmsg.react("⬇️");
            await pollmsg.react("⬆️");
        }

        // GIF command
        if (command === "gif") {
            const query = msg.content.replace(`${BOT_COMMAND_PREFIX}gif `, "");

            Giphy.random(query, (err, res) => {
                if (err) {
                    console.log("Error when trying to get random GIF (from GIPHY):")
                    console.log(err);
                    return;
                }

                responseData = res.data;
                gifUrl = responseData.url;
                msg.reply(gifUrl); // Discord should automatically let the viewer view the GIF without having to click on the link, but we attach the link anyway so that the user can find that URL of the link if they need it for whatever reason
            });
        }

        // Kick command
        if (command === "kick") {
            if (msg.member.permissions.has("KICK_MEMBERS")) {
                const user = msg.mentions.users.first();

                if (!user) {
                    msg.reply(`You need to mention someone to kick! Format: ${BOT_COMMAND_PREFIX}\`kick @<user>\``);
                    return;
                }

                if (user.id === msg.author.id) {
                    msg.reply("You cannot kick yourself.");
                    return;
                }

                if (user.id === client.user.id) {
                    msg.reply("You dare to kick me? You absolute weakling. I'd scotch you within a second if you tried.");
                    return;
                }

                try {
                    msg.guild.members.kick(user.id);
                } catch {
                    msg.reply(`Couldn't kick ${user}`);
                    return;
                }

                msg.reply(`${msg.author} kicked ${user}.`);                
            } else {
                msg.reply("You don't inherit the adequate privileges to kick a user.")
            }
        }

        // Ban command
        if (command === "ban" || command === "yeet") {
            if (msg.member.permissions.has("BAN_MEMBERS")) {
                const user = msg.mentions.users.first();

                if (!user) {
                    msg.reply(`You need to mention someone to ban! Format: ${BOT_COMMAND_PREFIX}\`ban @<user>\``);
                    return;
                }

                if (user.id === msg.author.id) {
                    msg.reply("You cannot ban yourself.");
                    return;
                }

                if (user.id === client.user.id) {
                    msg.reply("You dare to ban me? You absolute weakling. I'd scotch you within a second if you tried.");
                    return;
                }

                try {
                    msg.guild.members.ban(user.id);
                } catch {
                    msg.reply(`Couldn't ban ${user}`);
                    return;
                }

                msg.reply(`${msg.author} banned ${user}.`);                
            } else {
                msg.reply("You don't inherit the adequate privileges to ban a user.")
            }
        }
    }
});

console.log("Attemping to login using bot access token");
client.login(BOT_ACCESS_TOKEN);
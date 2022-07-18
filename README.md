# Johnston

### Introduction
Johnston is a Discord bot, with a bunch of commands to make moderating your server easier, and to make your server more fun

Johnston is a Discord bot that I programmed. I name it Johnston because I was too damn lazy to come up with a better name. Anyway, the bot has features to make managing your Discord server easier, and it also has commands to make your server more fun.
To view the different commands, you can do `$help`.

As of now, there are some commands that are still in development like the `$ban` and `$kick` command. 

### Abilities
You can view the capabilities of the bot using `$help`. You of course, can make aditional changes to the bot to suit your needs if required. As of now, the bot can do the following commands:

```
$help — different commands useable by the bot, also this message!
$ping — replies with "Pong!"
$avatar — displays your avatar
$echo <echo> — Replies with everything after the "$echo "
$joke — replies with a random joke (alias: $pun)
$punch @<user> — displays a GIF (from GIPHY) of a person punching another person and displays a caption
$membercount — displays the number of members in the server
$purge <msgcount> — deletes the last <msgcount> messages, if the user has adequate permissions (alias: $massdelete)
$poll <question> — creates a poll with the question and the users can vote with a tick, or a cross
$gif <query> — displays a GIF (from GIPHY) based on the query
$kick @<user> — kicks the user from the server (IN DEVELOPMENT)
$ban @<user> — bans the user from the server (alias: $yeet) (IN DEVELOPMENT)
```

### How to Install
If you want to use this bot as a template for your own, or just use it as your own, you can do so, easily. Just clone this repository, and install the required npm packages using the following commands.
```
npm install dotenv
npm install discord.js
npm install giphy-api --save
```
Then, create a file called `.env` and store your Discord API key and Giphy API key as environment variables (this is why you need to install dotenv).
```
BOT_TOKEN=<token>
GIPHY_API_KEY=<key>
```

Then, simply using Node.js, you can run the `bot.js` file in the `src` directory. 

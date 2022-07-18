# Johnston

### Introduction
Johnston is a Discord bot, with a bunch of commands to make moderating your server easier, and to make your server more fun

Johnston is a Discord bot that I programmed. I name it Johnston because I was too damn lazy to come up with a better name. Anyway, the bot has features to make managing your Discord server easier, and it also has commands to make your server more fun.
To view the different commands, you can do `$help`.

As of now, there are some commands that are still in development like the `$ban` and `$kick` command. 

### How to Install
If you want to use this bot as a template for your own, or just use it as your own, you can do so, easily. Just clone this repository, and install the required npm packages using the following commands.
```
npm install dotenv
npm install discord.js
npm install giphy-api --save
```
Then, create a file called `.env` and store your Discord API key, and Giphy API key.
```
BOT_TOKEN=<token>
GIPHY_API_KEY=<key>
```

Then, simply using Node.js, you can run the `bot.js` file in the `src` directory. 

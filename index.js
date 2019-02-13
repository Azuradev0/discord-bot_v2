// Calling packages
const Discord = require("discord.js");
const bot = new Discord.Client();
const weather = require("weather-js"); // `npm i weather-js`
const fs = require("fs"); 

// Functions
const func = require("./functions.js"); 

// JSON
const commands = JSON.parse(fs.readFileSync("Storage/commands.json", "utf8"));

// Global setings 
const prefix = "~"; 

// Listener Event: Runs whenever a message is received.
bot.on("message", message => {

    // Variables 
    let msg = message.content.toUpperCase(); 
    let sender = message.author; 
    let args = message.content.slice(prefix.length).trim().split(" "); 
    let cmd = args.shift().toLowerCase(); 

    if (sender.bot) return;
    if (!message.content.startsWith(prefix)) return; 

    // Command Handler 
    try {
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(bot, message, args, func); 
    } catch(e) { 

        console.log(e.message); 

    } finally { 

        console.log(`${message.author.username} ran the command: ${cmd}`); 

    }  

});

// Listener Event: Runs whenever the bot sends a ready event 
bot.on("ready", () => {
    console.log("Bot started.")
});

    bot.login("TOKEN");

const fs = require('fs');
const path = require('path');

const {Client, IntentsBitField, Collection} = require('discord.js');
const {BOT_TOKEN} = require("./config.json");

const client = new Client({
  intents:[
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});


//loads slash commands
const commandFolders = fs.readdirSync("./SlashCommands");
const commands = [];
client.commands = new Collection();

for(const folder of commandFolders){
  const commandFiles = fs.readdirSync(path.join(__dirname, 'SlashCommands', folder)).filter(file => file.endsWith('.js'));
  
  for(const file of commandFiles){
    const command = require(`./SlashCommands/${folder}/${file}`);
    client.commands.set(command.data.name, command);
    commands.push(command.data.toJSON());
  }
}


//loads events
const eventFolders = fs.readdirSync("./Events");

for(const folder of eventFolders){
  const eventFiles = fs.readdirSync(path.join(__dirname, 'Events', folder)).filter(file => file.endsWith('.js'));
  
  for(const file of eventFiles){
    const event = require(`./Events/${folder}/${file}`);
    
    if(event.once){
      client.once(event.name, (...args) => event.execute(...args, commands));
    }else{
      client.on(event.name, (...args) => event.execute(...args, commands));
    }
  }
}


//logs in
client.login(BOT_TOKEN);
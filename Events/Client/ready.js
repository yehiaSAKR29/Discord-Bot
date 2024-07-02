const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v10');
const {ActivityType} = require('discord.js');
const { BOT_TOKEN, GUILD_ID, CLIENT_ID } = require("../../config.json");

module.exports = {
  name: 'ready',
  once: true,
  execute(client, commands){
    registerSlashCommands(client, commands);
    setBotStatus(client);
  }
}


//registers slash commands
async function registerSlashCommands(client, commands){
  const rest = new REST({version: '10'}).setToken(process.env['BOT_TOKEN']);
  
  try{
    await rest.put(
      Routes.applicationGuildCommands(process.env['CLIENT_ID'], process.env['GUILD_ID']),
      {body: commands}
    );
    console.log(`✅\t${client.user.username} is online.`);
    console.log(`✅\t${commands.length} Slash commands registered succesfully.`);
    console.log("----------------------------------------------------------------");
  }catch(error){
    console.log`❌\tThere was an error: ${error}`;
  }
}


//sets bot status
async function setBotStatus(client){
  client.user.setActivity({name: 'Chess 2', type: ActivityType.Playing});
}

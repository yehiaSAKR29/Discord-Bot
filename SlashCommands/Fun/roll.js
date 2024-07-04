const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('roll')
    .setDescription('Rolls a dice'),

  async execute(interaction){
    const result = Math.floor(Math.random() * 6) + 1;

    
    //sends a random result from 1 to 6
    interaction.reply(`You rolled ${result}!`);
  }
}
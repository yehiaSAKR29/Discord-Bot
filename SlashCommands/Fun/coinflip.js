const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('coinflip')
    .setDescription('Flips a coin'),
  
  async execute(interaction){
    const responses = ['Heads', 'Tails'];


    //sends a random response from the array
    interaction.reply(`${responses[Math.floor(Math.random() * responses.length)]}!`);
  }
}
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('howgay')
    .setDescription('Calculates how gay a user is')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user you want to calculate the gayness of')
    ),

  async execute(interaction){
    const user = interaction.options.getUser('user') || interaction.user;


    //displays a random result from 0 to 100 as embed description
    const gayEmbed = {
      color: 0xff0000,
      title: 'Gayness Detector 3000',
      description: `${user} is ${Math.floor(Math.random() * 101)}% gay 🏳️‍🌈`
    };

    interaction.reply({embeds: [gayEmbed]});
  }
}
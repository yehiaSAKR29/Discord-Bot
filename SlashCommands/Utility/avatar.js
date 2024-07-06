const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Displays a user\'s avatar')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user you want to see the avatar of')
    ),

  async execute(interaction){
    const user = interaction.options.getUser('user') || interaction.user;


    //displays the user's avatar as the embed image
    const avatarEmbed = {
      color: 0xff0000,
      title: user.username,
      image: {
        url: user.displayAvatarURL({dynamic: true, format: 'png', size: 1024})
      }
    };

    interaction.reply({embeds: [avatarEmbed]});
  }
}
const {SlashCommandBuilder} = require('@discordjs/builders');
const {PermissionsBitField} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kicks someone from this server')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to kick')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('The reason for the kick')
        .setRequired(true)
    ),

  async execute(interaction){
    const target = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
    const reason = interaction.options.getString('reason');


    //checks if user has kick permissions
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)){
      interaction.reply({ content: "You don't have permissions to use this command!", ephemeral: true});
      return;
    }


    //checks if target is in the server and checks if target is kickable
    if(!target){
      interaction.reply({ content: "This user isn't currently in this server!", ephemeral: true});
      return;
    }
    if(target.id === interaction.guild.ownerId){
      interaction.reply({ content: "Are you seriously trying to kick the server owner?", ephemeral: true});
      return;
    }
    if(target.user.bot){
      interaction.reply({ content: "Are you seriously trying to kick a cute little bot?", ephemeral: true});
      return;
    }
    if(target.id === interaction.user.id){
      interaction.reply({ content: "Are you seriously trying to kick yourself?, what an idiot!", ephemeral: true});
      return;
    }
    if(target.permissions.has(PermissionsBitField.Flags.Administrator) || target.permissions.has(PermissionsBitField.Flags.KickMembers)){
      interaction.reply({ content: "You can't kick a moderator!", ephemeral: true});
      return;
    }

    const kickEmbed = {
      color: 0xff0000,
      title: 'USER KICKED',
      description: `> **User : **\t${target.user.toString()}\n> **Reason : **\t${reason}`,
      timestamp: new Date(),
        footer: {
          icon_url: interaction.user.avatarURL(),
          text: `${interaction.user.username}`
        }
    }


    //kicks the target and sends the kick embed
    target.kick({reason: reason});
    interaction.channel.send({embeds: [kickEmbed]});
    interaction.reply({content: `Kicked ${target.user.toString()} successfully!`, ephemeral: true});
  }
}
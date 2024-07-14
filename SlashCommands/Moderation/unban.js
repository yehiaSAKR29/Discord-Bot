const {SlashCommandBuilder} = require('@discordjs/builders');
const {PermissionsBitField} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unban')
    .setDescription('Unbans someone from this server')
    .addStringOption((option) =>
      option
        .setName('id')
        .setDescription('The ID of the user to unban')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('The reason for the unban')
        .setRequired(true)
    ),

  async execute(interaction){
    const target = interaction.options.getString('id');
    const reason = interaction.options.getString('reason');


    //checks if user has ban permissions
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)){
      interaction.reply({content: "You don't have permissions to use this command!", ephemeral: true});
      return;
    }


    //checks if target is banned in the server
    const banList = await interaction.guild.bans.fetch();
    const banned = banList.find(ban => ban.user.id === target);

    if(!banned){
      interaction.reply({content: "This user isn't currently banned from this server!", ephemeral: true});
      return;
    }

    const unbanEmbed = {
      color: 0xff0000,
      title: 'USER UNBANNED',
      description: `> **User : **\t${banned.user.tag} (${target})\n> **Reason : **\t${reason}`,
      timestamp: new Date(),
        footer: {
          icon_url: interaction.user.avatarURL(),
          text: `${interaction.user.username}`
        }
    }


    //unbans the target and sends the unban embed
    interaction.guild.members.unban(target, reason);
    interaction.channel.send({embeds: [unbanEmbed]});
    interaction.reply({content: `Unbanned ${banned.user.tag} successfully!`, ephemeral: true});
  }
}
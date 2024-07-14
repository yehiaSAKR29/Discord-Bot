const ms = require('ms');

const {SlashCommandBuilder} = require('@discordjs/builders');
const {PermissionsBitField} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mutes someone')
    .addUserOption((option) =>
      option
        .setName('user')
        .setDescription('The user to mute')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('duration')
        .setDescription('The duration of the mute (ex: 10m, 2h, 1d)')
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName('reason')
        .setDescription('The reason for the mute')
        .setRequired(true)
    ),

  async execute(interaction){
    const target = await interaction.guild.members.fetch(interaction.options.getUser('user').id);
    const reason = interaction.options.getString('reason');
    const duration = ms(interaction.options.getString('duration'));


    //checks if user has mute permissions and checks if duration is valid
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)){
      interaction.reply({content: "You don't have permissions to use this command!", ephemeral: true});
      return;
    }
    if(isNaN(duration)){
      interaction.reply({content: "Please enter a valid mute duration! (ex: 10m, 2h, 1d)", ephemeral: true});
      return;
    }
    if(duration < 60000 || duration > 2.419e9){
      interaction.reply({content: "Mute duration can't be less than 1m or more than 28d!", ephemeral: true});
      return;
    }


    //checks if target is in the server and checks if target is muteable
    if(!target){
      interaction.reply({content: "This user isn't currently in this server!", ephemeral: true});
      return;
    }
    if(target.id === interaction.guild.ownerId){
      interaction.reply({content: "Are you seriously trying to mute the server owner?", ephemeral: true});
      return;
    }
    if(target.user.bot){
      interaction.reply({content: "Are you seriously trying to mute a cute little bot?", ephemeral: true});
      return;
    }
    if(target.id === interaction.user.id){
      interaction.reply({content: "Are you seriously trying to mute yourself?, what an idiot!", ephemeral: true});
      return;
    }
    if(target.permissions.has(PermissionsBitField.Flags.Administrator) || target.permissions.has(PermissionsBitField.Flags.MuteMembers)){
      interaction.reply({content: "You can't mute a moderator!", ephemeral: true});
      return;
    }


    //mutes the target
    target.timeout(duration, reason);
    interaction.reply({content: `Muted ${target.user.toString()} successfully!`, ephemeral: true});
  }
}
const {EmbedBuilder} = require("discord.js");
const {LOGS_CHANNEL} = require("../../config.json");

module.exports = {
  name: 'roleDelete',
  async execute(role){
    const logsChannel = LOGS_CHANNEL;
    const channel = role.guild.channels.cache.get(logsChannel);

    if(!channel){
      return;
    }


    //logs deleted roles
    const logsEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("🎭 Role Deleted")
      .addFields({name: "Name", value: `> ${role.name}`})
      .addFields({name: "ID", value: `> ${role.id}`})
      .addFields({name: "Color", value: `> ${role.hexColor}`})
      .setTimestamp()
      .setFooter({text: 'Log System'})

    channel.send({embeds: [logsEmbed]});
  }
}

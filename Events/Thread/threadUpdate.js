const {EmbedBuilder} = require("discord.js");
const {LOGS_CHANNEL} = require("../../config.json");

module.exports = {
  name: "threadUpdate",
  async execute(oldChannel, newChannel) {

    if(oldChannel.name === newChannel.name){
      return;
    }

    const logsChannel = LOGS_CHANNEL;
    const channel = newChannel.guild.channels.cache.get(logsChannel);

    if (!channel) {
      return;
    }


    //logs updated threads
    const logsEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("🔗 Thread Edited")
      .addFields({name: "Old Name", value: `> ${oldChannel.name}`})
      .addFields({name: "New Name", value: `> ${newChannel.name}`})
      .addFields({name: "Created By", value: `> ${newChannel.guild.members.cache.get(newChannel.ownerId)}`})
      .addFields({name: "Channel", value: `> <#${newChannel.id}>`})
      .setTimestamp()
      .setFooter({text: 'Log System'})

    channel.send({embeds: [logsEmbed]});
  }
}

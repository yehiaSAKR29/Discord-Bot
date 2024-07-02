const {EmbedBuilder} = require("discord.js");
const {LOGS_CHANNEL} = require("../../config.json");

module.exports = {
  name: 'threadDelete',
  async execute(thread){
    const logsChannel = LOGS_CHANNEL;
    const channel = thread.guild.channels.cache.get(logsChannel);

    if (!channel) {
      return;
    }


    //logs deleted threads
    const logsEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("🔗 Thread Deleted")
      .addFields({name: "Name", value: `> ${thread.name}`})
      .addFields({name: "Created By", value: `> ${thread.guild.members.cache.get(thread.ownerId)}`})
      .addFields({name: "Member Count", value: `> ${thread.memberCount}`})
      .addFields({name: "Messages Sent", value: `> ${thread.messages.cache.size}`})
      .setTimestamp()
      .setFooter({text: 'Log System'})

    channel.send({embeds: [logsEmbed]});
  }
}

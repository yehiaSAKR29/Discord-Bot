const {EmbedBuilder} = require("discord.js");
const {LOGS_CHANNEL} = require("../../config.json");

module.exports = {
  name: 'threadCreate',
  async execute(thread){
    const logsChannel = LOGS_CHANNEL;
    const channel = thread.guild.channels.cache.get(logsChannel);

    if (!channel) {
      return;
    }


    //logs created threads
    const logsEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("🔗 Thread Created")
      .addFields({name: "Name", value: `> ${thread.name}`})
      .addFields({name: "Created By", value: `> ${thread.guild.members.cache.get(thread.ownerId)}`})
      .addFields({name: "Channel", value: `> <#${thread.id}>`})
      .addFields({name: "Created At", value: `> <#${thread.parent.id}>`})
      .setTimestamp()
      .setFooter({text: 'Log System'})

    channel.send({embeds: [logsEmbed]});
  }
}

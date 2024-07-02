const {EmbedBuilder} = require("discord.js");
const {LOGS_CHANNEL} = require("../../config.json");

module.exports = {
  name: "messageDelete",
  async execute(message) {
    if (message.author.bot) {
      return;
    }

    const logsChannel = LOGS_CHANNEL;
    const channel = message.guild.channels.cache.get(logsChannel);

    if (!channel) {
      return;
    }


    //logs deleted messages
    const logsEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("💬 Message Deleted")
      .addFields({name: "Message", value: `> ${message.content || "No Message Content"}`})
      .addFields({name: "Author", value: `> ${message.author}`})
      .addFields({name: "Channel", value: `> <#${message.channel.id}>`})
      .setTimestamp()
      .setFooter({text: 'Log System'})

    if (message.attachments.size > 0) {
      const attachments = message.attachments.map((attachment) => attachment.url).join(" , ");
      logsEmbed.addFields({name: "Attachments", value: `> ${attachments}`});
    }

    channel.send({embeds: [logsEmbed]});
  }
}

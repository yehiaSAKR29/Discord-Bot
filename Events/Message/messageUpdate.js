const {EmbedBuilder} = require("discord.js");
const {LOGS_CHANNEL} = require("../../config.json");

module.exports = {
  name: "messageUpdate",
  async execute(oldMessage, newMessage) {
    if (oldMessage.author.bot) {
      return;
    }
    if(oldMessage.content === newMessage.content){
      return;
    }

    const logsChannel = process.env["LOGS_CHANNEL"];
    const channel = newMessage.guild.channels.cache.get(logsChannel);

    if (!channel) {
      return;
    }


    //logs updated messages
    const logsEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("💬 Message Edited")
      .addFields({name: "Old Message", value: `> ${oldMessage.content || "No Message Content"}`})
      .addFields({name: "New Message", value: `> ${newMessage.content || "No Message Content"}`})
      .addFields({name: "Author", value: `> ${newMessage.author}`})
      .addFields({name: "Channel", value: `> <#${newMessage.channel.id}>`})
      .setTimestamp()
      .setFooter({text: 'Log System'})

    channel.send({embeds: [logsEmbed]});
  }
}

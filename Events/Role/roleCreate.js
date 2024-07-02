const {EmbedBuilder} = require("discord.js");
const {LOGS_CHANNEL} = require("../../config.json");

module.exports = {
  name: 'roleCreate',
  async execute(role){
    const logsChannel = LOGS_CHANNEL;
    const channel = role.guild.channels.cache.get(logsChannel);

    if(!channel){
      return;
    }


    //logs created roles
    const logsEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle("🎭 Role Created")
      .addFields({name: "Role", value: `> ${role}`})
      .addFields({name: "ID", value: `> ${role.id}`})
      .setTimestamp()
      .setFooter({text: 'Log System'})
    
    channel.send({embeds: [logsEmbed]});
  }
}

const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Tells you the bot\'s ping'),

  async execute(interaction){
    await interaction.deferReply();
    const reply = await interaction.fetchReply();


    //calculates the latency
    const ping = reply.createdTimestamp - interaction.createdTimestamp;
    
    interaction.editReply(`**Bot Latency:**\t${ping}ms\n**API Latency:**\t${interaction.client.ws.ping}ms`);
  }
}
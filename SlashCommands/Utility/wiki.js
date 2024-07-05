const wiki = require('wikijs').default();
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('wiki')
    .setDescription('Gets search results from Wikipedia')
    .addStringOption((option) =>
      option
        .setName('query')
        .setDescription('The search query')
        .setRequired(true)
    ),

  async execute(interaction){
    const search = interaction.options.getString('query');


    //delays the response while it searches for the query
    await interaction.deferReply();
    const result = await wiki.search(search);

    if(!result.results.length){
      interaction.editReply('No results found!');
      return;
    }


    //gets the first search result and summarizes it
    const page1 = await wiki.page(result.results[0]);
    let summary = await page1.summary()
    
    if(summary.length > 4000){
      summary = summary.slice(0, 4000) + '...';
    }
    
    const wikiEmbed = {
      color: 0xff0000,
      title: search.toUpperCase(),
      description: `\`\`\`${summary}\`\`\``,
    }

    interaction.editReply({embeds: [wikiEmbed]});
  }
}
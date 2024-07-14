const {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder} = require("discord.js");
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows a list of all the commands'),

  async execute(interaction){
    const selections = [
      {name: 'Fun', emoji: '🤪'},
      {name: 'Moderation', emoji: '🛠️'},
      {name: 'Utility', emoji: '⚙️'}
    ];


    //creates the menu buttons
    const buttons = selections.map(selection =>
      new ButtonBuilder()
        .setCustomId(selection.name)
        .setLabel(selection.name)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(selection.emoji)
    );
    const selectionsRow = new ActionRowBuilder().addComponents(buttons);

    
    //creates the embeds
    const defaultEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('__HELP MENU__')
      .setDescription('Select a category to view it\'s commands!')
    
    const funEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('__FUN COMMANDS__')
      .addFields({name: '/8ball', value: '> Asks the magic 8ball a question'})
      .addFields({name: '/catfact', value: '> Tells you a random cat fact'})
      .addFields({name: '/coinflip', value: '> Flips a coin'})
      .addFields({name: '/fact', value: '> Tells you a random fact'})
      .addFields({name: '/howgay', value: '> Calculates how gay someone is'})
      .addFields({name: '/kill', value: '> Kills someone'})
      .addFields({name: '/roll', value: '> Rolls a dice'})
      .addFields({name: '/rps', value: '> Challenges someone to a duel of rock paper scissors'})
      .setTimestamp()
    
    const moderationEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('__MODERATION COMMANDS__')
      .addFields({name: '/ban', value: '> Bans someone from this server'})
      .addFields({name: '/kick', value: '> Kicks someone from this server'})
      .addFields({name: '/mute', value: '> Mutes someone'})
      .addFields({name: '/purge', value: '> Purges messages in the channel'})
      .addFields({name: '/unban', value: '> Unbans someone from this server'})
      .setTimestamp()
    
    const utilityEmbed = new EmbedBuilder()
      .setColor(0xff0000)
      .setTitle('__UTILITY COMMANDS__')
      .addFields({name: '/avatar', value: '> Displays someone\'s avatar'})
      .addFields({name: '/poll', value: '> Creates a poll'})
      .addFields({name: '/say', value: '> Says something'})
      .addFields({name: '/wiki', value: '> Gets search results from wikipidia'})
      .setTimestamp()


    //sends the default embed and makes sure only the user can use the buttons
    await interaction.reply({embeds: [defaultEmbed], components: [selectionsRow]});
    const userFilter = i => i.user.id === interaction.user.id;
    const userCollector = interaction.channel.createMessageComponentCollector({filter: userFilter});

    userCollector.on('collect', async userInteraction => {


      //checks if a button is pressed and sends the corresponding embed
      if(userInteraction.customId === 'Fun'){
        await userInteraction.update({embeds: [funEmbed], components: [selectionsRow]});
      }
      if(userInteraction.customId === 'Moderation'){
        await userInteraction.update({embeds: [moderationEmbed], components: [selectionsRow]});
      }
      if(userInteraction.customId === 'Utility'){
        await userInteraction.update({embeds: [utilityEmbed], components: [selectionsRow]});
      }
    });
  }
}
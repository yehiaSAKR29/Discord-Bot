const {ButtonBuilder, ActionRowBuilder, ButtonStyle} = require('discord.js');
const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Challenges someone to a duel of rock paper scissors')
    .addUserOption((option) =>
      option
        .setName('opponent')
        .setDescription('The user you want to challenge')
        .setRequired(true)
    ),

  async execute(interaction) {
    const opponent = interaction.options.getUser('opponent');
    const choices = [
      {name: 'Rock', emoji: '🪨', beats: 'Scissors'},
      {name: 'Paper', emoji: '📄', beats: 'Rock'},
      {name: 'Scissors', emoji: '✂️', beats: 'Paper'}
    ];


    //creates the rock/paper/scissors buttons
    const buttons = choices.map(choice =>
      new ButtonBuilder()
        .setCustomId(choice.name)
        .setLabel(choice.name)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(choice.emoji)
    );
    const choicesRow = new ActionRowBuilder().addComponents(buttons);


    //checks if opponent is themselves or a bot
    if (interaction.user.id === opponent.id){
      await interaction.reply({content: "You can't challenge yourself!", ephemeral: true });
      return;
    }
    if(opponent.bot){
      await interaction.reply({content: "You can't challenge a bot!", ephemeral: true });
      return;
    }


    //sends the challenge message with the buttons
    await interaction.reply({
      content: `**RPS DUEL**\n\n${opponent}, you have been challenged to a rock paper scissors duel by ${interaction.user}!\n\n${opponent}, please select Rock, Paper or Scissors!`,
      components: [choicesRow]
    });


    //makes sure that only the opponent can use the buttons (and only in 30 seconds) then sends a message with the buttons
    const filter = i => i.user.id === opponent.id;
    const collector = interaction.channel.createMessageComponentCollector({filter, time: 30_000});
    
    collector.on('collect', async opponentInteraction => {
      const opponentChoice = choices.find(choice => choice.name === opponentInteraction.customId);
      await opponentInteraction.reply({content: `You chose ${opponentChoice.name}!`, ephemeral: true});

      await interaction.channel.send({
        content: `**RPS DUEL**\n\n${opponent} has picked an option.\n\n${interaction.user}, please select Rock, Paper or Scissors!`,
        components: [choicesRow]
      });


      //makes sure that only the challenger can use the buttons (and only in 30 seconds)
      const userFilter = i => i.user.id === interaction.user.id;
      const userCollector = interaction.channel.createMessageComponentCollector({filter: userFilter, time: 30_000});

      userCollector.on('collect', async userInteraction => {
        const userChoice = choices.find(choice => choice.name === userInteraction.customId);
        await userInteraction.reply({content: `You chose ${userChoice.name}!`, ephemeral: true});
        let result;


        //determines the winner and sends the result
        if(opponentChoice.beats === userChoice.name){
          result = `🎉${opponent} has won the duel!🎉`;
        }else if(userChoice.beats === opponentChoice.name){
          result = `🎉${interaction.user} has won the duel!🎉`;
        }else{
          result = `It's a tie!`;
        }
        
        await interaction.channel.send(`**🏆RPS DUEL🏆**\n\n${interaction.user} chose ${userChoice.emoji}  -  ${opponent} chose ${opponentChoice.emoji}.\n\n${result}`);
        userCollector.stop();
      });


      //handles the case where the user doesn't respond in 30 seconds
      userCollector.on('end', collected => {
        if(collected.size === 0){
          interaction.channel.send(`**RPS DUEL**\n\nGAME OVER!\n\n${interaction.user} didn't respond in time!`);
        }
      });
      collector.stop();
    });


    //handles the case where the opponent doesn't respond in 30 seconds
    collector.on('end', collected => {
      if(collected.size === 0 && !opponentChoice){
        interaction.channel.send(`**RPS DUEL**\n\nGAME OVER!\n\n${opponent} didn't respond in time!`);
      }
    });
  }
};

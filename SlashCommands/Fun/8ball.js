const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('8ball')
    .setDescription('Asks the magic 8ball a question')
    .addStringOption((option)=>
      option
        .setName('question')
        .setDescription('The question you want to ask the magic 8ball')
        .setRequired(true)
    ),

  async execute(interaction){
    const question = interaction.options.getString('question');
    const responses = [
      'Absoulutely not', 'Absolutely', 'Certainly', 'Certainly not', 'Hell nah!', 'Hell yeah!', 'Idk mate',
      'Maybe', 'Most likely', 'Most likely not', 'Nah', 'No way bruv', 'Not a clue mate', 'Of course',
      'Of course not', 'Possibly', 'Probably', 'Probably not', 'Sure thing', 'Without a doubt', 'Yeah'
    ];
    

    //checks if question ends with "?" and sends a random response from the array
    if(!question.endsWith('?')){
      interaction.reply({content: 'Please ask a question that ends with a question mark!', ephemeral: true});
      return;
    }

    interaction.reply(`> ${question}\n\n🎱 :  ${responses[Math.floor(Math.random() * responses.length)]}`);
  }
}

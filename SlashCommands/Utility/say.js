const {SlashCommandBuilder} = require('@discordjs/builders');


module.exports = {
  data: new SlashCommandBuilder()
    .setName('say')
    .setDescription('Says something')
    .addStringOption((option) =>
        option
          .setName('message')
          .setDescription('The message you want me to say')
          .setRequired(true)
    ),

  async execute(interaction){
    const message = interaction.options.getString('message');
    const owner = interaction.guild.ownerId;


    //checks if message contains @everyone or @here or @server-owner
    if(interaction.user.id !== owner){
      if(message.includes('@everyone') || message.includes('@here') || message.includes(`<@${owner}>`)){
        interaction.reply({content: "You can't mention `everyone`, `here`, or the server owner in your message!", ephemeral: true});
        return;
      }
    }

    interaction.channel.send(`${message}`);
    interaction.reply({content: 'Your message has been sent successfully!', ephemeral: true});
  }
}
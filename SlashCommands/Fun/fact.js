const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('fact')
    .setDescription('Tells you a random fact'),

  async execute(interaction){
    const facts = [
      'Your brain is constantly eating itself.',
      'A chicken once lived for 18 months without a head.',
      'The fear of long words is called Hippopotomonstrosesquippedaliophobia.',
      'Scotland has 421 words for snow.',
      'The longest English word is 189,819 letters long.',
      'The current American flag was designed by a high school student',
      'The Anglo-Zanzibar War (1896) was the shortest war ever, lasting just 38 minutes.',
      'We actually produce enough food to feed everyone on the planet; the problem is distribution.',
      'The Eiffel Tower was originally made for Barcelona.',
      'The world\'s longest concert lasted 453 hours.',
      'The word robot comes from the Czech word robota, which translates to "forced labor".',
      'iPhones were almost in the shape of an apple.',
      'NASA\'s internet speed is 91 GB per second.',
      'Ketchup was once sold as medicine to treat diarrhea and indigestion.',
      'Chocolate has been used as a currency in ancient civilizations of Mexico and South America.',
      'French fries originated in Belgium, not France.',
      'Humans DNA is 60% the same as bananas.',
      'Rockstar Games hired real-life gang members to voice background characters in GTA V.',
      'CS:GO was initially a custom mod you could play in Half-Life.',
      'Many of the characters in Undertale are named after fonts.',
      'In Switzerland, it is illegal to own just one guinea pig.',
      'If Pinocchio said, "My Nose Will Grow Now" it would create a paradox.',
      'Only 5% of the ocean has been explored.',
      'A swarm of 20,000 bees followed a car for two days as their queen was trapped inside.',
      'The average person walks the equivalent of five times around the world in their lifetime.',
      'George W. Bush was once a cheerleader.',
      'The giant stone heads on Easter Island have hidden bodies.',
      'Canadians say "sorry" so much that a law was passed in 2009 declaring that an apology can\'t be used as evidence of admission to guilt.',
      'The only letters that don\'t appear on the periodic table are "J" and "Q".',
      'If a Polar Bear and a Grizzly Bear mate, their offspring is called a Pizzly Bear.',
      'In 2006, a Coca-Cola employee offered to sell Coca-Cola secrets to Pepsi. Pepsi responded by notifying Coca-Cola.',
      'Daniel Radcliffe was allergic to his Harry Potter glasses.',
      'Fruit stickers are edible, though the same as any fruit; washing prior to eating is recommended.',
      'At birth, a baby panda is smaller than a mouse.',
      'The flashes of colored light you see when you rub your eyes are called "phosphenes."',
      'The voice actors of SpongeBob and Karen, Plankton\'s computer wife, have been married since 1995.',
      'The voice actors of Mickey and Minnie, have been married since 1991.',
      'There is an island called “Just Enough Room,” where there\'s just enough room for a tree and a house.',
      'The color red doesn\'t really make bulls angry; they are color-blind.',
      'Saint Lucia is the only country in the world named after a woman.',
      'There is a statue of Nikola Tesla in Silicon Valley that radiates free Wi-Fi.',
      'A study from Harvard University finds that having no friends can be just as deadly as smoking.',
      'When we\'re born, the only innate fears we have are the fear of falling and the fear of loud sounds. All other fears are learned.',
      'In Svalbard, a remote Norwegian island, it is illegal to die.',
      'The founder of Pringles, Fredric Baur, requested to be buried in a Pringles can. His children honored his request.',
      'In every scene of Fight Club, there is a Starbucks coffee cup.',
      'In Switzerland, it is illegal to flush the toilet after 10 pm.',
      'A snail can sleep for 3 years.',
      'On average, 97 chickens are killed every 0.05 seconds worldwide.',
      'A woman once tried to commit suicide by jumping off the Empire State Building. She jumped from the 86th floor but was blown back onto the 85th floor by a gust of wind.',
      'Clinomania is the excessive desire to lay in bed all day.',
      'The Hollywood sign in Los Angeles once said Hollywoodland but was changed in 1949.',
      'There is only one country on earth without mosquitoes: Iceland.',
      'Every two weeks, another language or dialect goes extinct. There is a language in Nigeria that is currently only spoken by four living individuals.',
      'Bananas are berries, but strawberries are not.',
      'The original name for the search engine Google was "Backrub".',
      'Humans are the only animals that blush.',
      'The Night\'s Watch cloaks in Game of Thrones were made from IKEA rugs.',
      'The shortest commercial flight in the world is in Scotland and takes 90 seconds.',
      'The first person convicted of speeding was going 8mph.',
      'It is Illegal to Feed Pigeons in Venice.',
      'Fact is, Walter White couldn\'t have done it without me.'
    ];


    //sends a random response from the array
    interaction.reply(facts[Math.floor(Math.random() * facts.length)]);
  }
}
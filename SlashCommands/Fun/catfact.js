const {SlashCommandBuilder} = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('catfact')
    .setDescription('Tells you a random cat fact'),

  async execute(interaction){
    const facts = [
      'Cats sleep for about 16 hours a day on average.',
      'A group of cats is called a clowder.',
      'A cat has five toes on their front paws, but only four on their back paws.',
      'Cats have whiskers on the backs of their front legs, too.',
      'Cats are believed to be the only mammals who don\'t taste sweetness.',
      'Cats can jump up to six times their length.',
      'Cats have an extra organ that allows them to taste scents on the air, which is why your cat stares at you with her mouth open from time to time.',
      'Cats have the largest eyes relative to their head size of any mammal.',
      'Cats rough tongues can lick a bone clean of any shred of meat.',
      'Male cats are more likely to be left-pawed, while female cats are more likely to be right-pawed.',
      'Some cats can swim.',
      'Cats are crepuscular, which means that they\'re most active at dawn and dusk.',
      'Cats are fastidious creatures about their "bathroom", If you have more than one cat, you should have one litter box for each.',
      'Cats can spend up to a third of their waking hours grooming.',
      'Cats live longer when they stay indoors.',
      'Many cats are actually lactose intolerant.',
      'Female cats have the ability to get pregnant when they are only 4 months old.',
      'A cat with a question mark shaped tail is asking, "Want to play?".',
      'Cats find it threatening when you make direct eye contact with them.',
      'Cats mark you as their territory when they rub their faces and bodies against you.',
      'hissing is not an aggressive behavior by a cat, it is a defensive gesture.',
      'If cats are fighting, the cat that\'s hissing is the more vulnerable one.',
      'If your cat approaches you with a straight, almost vibrating tail, this means that she is extremely happy to see you.',
      'Meowing is a behavior that cats developed exclusively to communicate with people.',
      'A Cat flops over and exposes his belly when he\'s relaxed and showing trust towards you.',
      'When cats hit you with retracted claws, they\'re playing, not attacking.',
      'When dogs wag their tails, they may be expressing happiness. When cats wag their tail, they are warning you that you are getting on their last nerve.',
      'When your cat sticks his butt in your face, he is doing so as a gesture of friendship.',
      'Your cat drapes its tail over another cat, your dog, or you as a symbol of friendship.',
      'Cats like to sleep on things that smell like their owners, such as their pillows and dirty laundry.',
      'Cats often attack your ankles when they\'re bored.',
      'Certain cats go crazy for foods you wouldn\'t expect, like olives, potato chips, and the hops in beer.',
      'Cats really dislike citrus scents.',
      'If you can\'t find your cat, you should look in a box or a bag, as these are some of their favorite hiding spots.',
      'Many cats like to lick their owner\'s freshly washed hair.',
      'Abraham Lincoln had four cats that lived in the White House with him.',
      'Maria Assunta left her cat, Tomasso, her entire $13 million fortune when she died in 2011.',
      'Stubbs, a orange cat, was the mayor of Talkeetna, Alaska, for 20 years.',
      'A group of kittens is called a kindle.',
      'About half of the cats in the world respond to the scent of catnip.',
      'The oldest cat in the world was 38 years old when it died.',
      'Cat breeders are called catteries.',
      'Cats can drink sea water in order to survive.',
      'Cats might choose to mate with their brothers and sisters.',
      'Cats have contributed to the extinction of 63 different species.',
      'Cats perceive people as big, ugly, hairless cats.',
      'White cats with blue eyes are prone to deafness.',
      'The record for the longest cat ever is 48.5 inches.',
      'Ancient Egyptians would shave off their eyebrows when their cats died.',
      'Over her lifetime, a cat called Dusty had a total of 420 kittens.',
      'Unfortunately, cats are still consumed as food in some parts of the world.',
      'All kittens are born with blue eyes.',
      'Many people are allergic to cats, but cats can also be allergic to humans.',
      'Cats use their whiskers to judge whether they will fit through an opening or not.',
      'When it comes to adoption, black cats are the least popular.',
      'Most cats enjoy spending time alone.',
      'Respect Your Cat Day is celebrated on March 28th every year.',
      'Hug Your Cat Day is celebrated on June 4th every year.',
      'Cat World Domination Day is celebrated on June 24th every year.',
      'International Cat Day is celebrated on August 8th every year.',
      'National Cat Day is celebrated on October 29th every year.',
      'December is National Cat Lovers Month.'
    ]


    //sends a random response from the array
    interaction.reply(facts[Math.floor(Math.random() * facts.length)]);
  }
}
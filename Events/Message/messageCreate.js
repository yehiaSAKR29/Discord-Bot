module.exports = {
  name: 'messageCreate',
  async execute(message){
    if(message.author.bot){
      return;
    }

    const content = message.content.toLowerCase();
    const hello = /\bhello\b/i;
    const hey = /\bhey\b/i;
    const hi = /\bhi\b/i;
    const cat = /\bcat(s)?\b/i;
    const kitten = /\bkitten(s)?\b/i;
    const kitty = /\bkitty\b/i;
    

    //replies to greeting-messages
    if (hello.test(content) || hey.test(content) || hi.test(content)){
      message.reply('Hello there mate!');
    }


    //replies to cat-messages
    if (cat.test(content) || kitten.test(content) || kitty.test(content)) {
      message.reply('Meow!');
    }
  }
}

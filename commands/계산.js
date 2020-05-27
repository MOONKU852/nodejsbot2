const Discord = require('discord.js');
const math = require('mathjs');

exports.run = (client, message, args, tools) => {

  if(!args[0]) return message.channel.send('Please input a calculation.');

  let resp;
  try {
    resp = math.evaluate(args.join(' '))
  } catch (e) {
    return message.channel.send('Please enter a valid calculation.');
  }


  const embed = new Discord.RichEmbed()
    .setColor(`#40e0d0`)
    .setTitle('Math Calculation')
    .addField('Input', `\`\`\`css\n${args.join('')}\`\`\``)
    .addField('Output', `\`\`\`css\n${resp}\`\`\``)

message.channel.send(embed);

}
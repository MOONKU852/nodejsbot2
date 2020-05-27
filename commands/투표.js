const Discord = require('discord.js');

exports.run = async (client, message, args, tools) => {
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`<@${message.author.id}> ` + "명령어를 실행할 권한을 가지고 있지 않습니다.");

    if (!args[0]) return message.channel.send('사용방법: ~투표 (투표 내용)');

    const embed = new Discord.RichEmbed()
    .setColor(`#40e0d0`)
    .setFooter('두둥탁')
    .setTimestamp()
    .setDescription(args.join(' '))
    .setTitle(`투표 작성자: ${message.author.username}`);

    let msg = await message.channel.send(embed);

    await msg.react('✅');
    await msg.react('❎');

    message.delete({timeout: 1000});

}
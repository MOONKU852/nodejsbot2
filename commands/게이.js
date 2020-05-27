const Discord = require('discord.js');

exports.run = async (client, message, args) => {
    message.channel.send("당신이 게이일 확률은 " + Math.floor(Math.random() * 100 + 1) + "% 퍼센트 입니다.");
}
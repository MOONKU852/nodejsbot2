const Discord = require('discord.js');
const client = new Discord.Client();
const token = process.env.token;
const moment = require("moment");
require("moment-duration-format");
const superagent = require("superagent")
const welcomeChannelName = "🤗ㅣ손님-오셨당";
const byeChannelName = "😥ㅣ손님-나가셨당";
const welcomeChannelComment = "님 저희 [문쿠 커뮤니티]에 오신 걸 환영합니다!:hugging: 규칙방 에 있는 규칙 읽어주세요!";
const byeChannelComment = "님 저희 [문쿠 커뮤니티]를 떠나셨군요. 안녕히 가세요.:disappointed_relieved:";
const prefix = '~';
const ownerID = '617059154942623825';
  
client.on('message', message => {
  let args = message.content.slice(prefix.length).trim().split(' ');
  let cmd = args.shift().toLowerCase();

  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;

  try {

    delete require.cache[require.resolve(`./commands/${cmd}.js`)];

    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(client, message, args);

  } catch (e) {
    console.log(e.stack);
  }

});

client.on('ready', () => {
    console.log('켰다.');
    client.user.setPresence({ game: { name: '~help' }, status: 'online' })
  });

  client.on("guildMemberAdd", (member) => {
    const guild = member.guild;
    const newUser = member.user;
    const welcomeChannel = guild.channels.find(channel => channel.name == welcomeChannelName);
  
    welcomeChannel.send(`<@${newUser.id}> ${welcomeChannelComment}\n`);
  
    member.addRole(guild.roles.find(role => role.name == "두둥탁"));
  });
  
  client.on("guildMemberRemove", (member) => {
    const guild = member.guild;
    const deleteUser = member.user;
    const byeChannel = guild.channels.find(channel => channel.name == byeChannelName);
  
    byeChannel.send(`<@${deleteUser.id}> ${byeChannelComment}\n`);
  });
  client.on('message', async (message, args) => {
    if(message.content == '~고양이') {
      let msg = await message.channel.send("Generating...")

      let {body} = await superagent
      .get(`http://aws.random.cat/meow`)
      //console.log(body.file)
      if(!{body}) return message.channel.send("I Broke! Try again.")

          let embed = new Discord.RichEmbed()
          .setColor('#40e0d0')
          .setAuthor(`깜찍한 고양이 사진 대령이오~!`, message.author.displayAvatarURL)
          .setImage(body.file)
          .setTimestamp()
          .setFooter(`두둥탁`)
          message.channel.send(embed)

          msg.delete();
    }
    if(message.content == '~강아지') {
      let msg = await message.channel.send("Generating...")

      let {body} = await superagent
      .get(`https://dog.ceo/api/breeds/image/random`)
      //console.log(body.file)
      if(!{body}) return message.channel.send("I Broke! Try again.")

          let embed = new Discord.RichEmbed()
          .setColor('#40e0d0')
          .setAuthor(`귀여운 강아지 사진 대령이오~!`, message.author.displayAvatarURL)
          .setImage(body.message)
          .setTimestamp()
          .setFooter(`두둥탁`)
          message.channel.send(embed)

          msg.delete();
    }
    if(message.content == '~봇정보') {
      let embed = new Discord.RichEmbed()
      let img = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
      var duration = moment.duration(client.uptime).format(" D [일], H [시간], m [분], s [초]");
      embed.setColor('#40e0d0')
      embed.setAuthor('봇 정보', img)
      embed.setFooter(`두둥탁`)
      embed.addBlankField()
      embed.addField('RAM usage',    `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`, true);
      embed.addField('running time', `${duration}`, true);
      embed.addField('user',         `${client.users.size.toLocaleString()}`, true);
      embed.addField('server',       `${client.guilds.size.toLocaleString()}`, true);
      embed.addField('channel',      `${client.channels.size.toLocaleString()}`, true);
      embed.addField('Discord.js',   `v${Discord.version}`, true);
      embed.addField('Node',         `${process.version}`, true);
      
      let arr = client.guilds.array();
      let list = '';
      list = `\`\`\`css\n`;
      
      for(let i=0;i<arr.length;i++) {
        // list += `${arr[i].name} - ${arr[i].id}\n`
        list += `${arr[i].name}\n`
      }
      list += `\`\`\`\n`
      embed.addField('list:',        `${list}`);
  
      embed.setTimestamp()
      message.channel.send(embed);
    }
  
    if(message.content == '~VIP') {
      let embed = new Discord.RichEmbed()
        .setColor('#40e0d0')
        .setTitle('VIP')
        .setThumbnail(message.author.displayAvatarURL)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField("**VIP 얻는방법**", 'VIP는 구매를 해야 얻는 것이 아닙니다!\n문쿠 혹은 물탁이 와 서로 친한 사이거나\n저희 [문쿠 커뮤니티]에서 오랫동안\n활동하거나 도와주신다면 얻으실 수 있습니다!')
        .addField("**VIP 혜택**", '•VIP 역할\n•VIP 태그 (원하지 않으신다면 안 사용하셔도 됩니다.)\n•별명 변경\n•자신만의 역할 주문 제작', true)
        .setFooter('두둥탁')
        .setTimestamp();
        message.channel.send(embed)
    }

    if(message.content == '~규칙') {
      let embed = new Discord.RichEmbed()
        .setColor('#40e0d0')
        .setTitle('VIP')
        .setThumbnail(message.author.displayAvatarURL)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField("**[ 채팅 규칙 ]**", '•욕설 사용 시 경고 1 (이모티콘은 제외)\n•싸움 시 경고 2\n•타인 차별 시 경고 2\n•타인 비난 시 경고 2\n•도배 시 그 글 삭제, 뮤트 (똑같은 글, 이모티콘, 사진, 동영상, GIF를 4번 이상 연속적으로 보낼 시 도배로 간주(글은 길이마다 다르고 사진, GIF는 크기마다 다름))\n•구걸 시 뮤트 (무엇을 계속 달라고 할 시 구걸로 간주)\n•홍보방 제외한 방에서 홍보할 시 그 글 삭제, 경고 1\n•음란물 관련 단어, 이모티콘을 사용하거나 사이트, 디스코드 서버 초대 링크, 사진, 동영상, GIF 유포 시 그 글 삭제, 차단')
        .addField("**[ 권력남용 규칙 ]**", '•허락 없이 마음대로 자신 혹은 타인에게 역할을 주거나 삭제 시 그 전으로 되돌림, 경고 3\n•허락 없이 마음대로 자신 혹은 타인의 인증됨 역할 삭제 시 그 전으로 되돌림, 추방\n•허락 없이 마음대로 뮤트된 사람 혹은 차단된 사람을 풀거나 해제할 시 그 전으로 되돌림, 추방\n•허락 없이 마음대로 카테고리, 채팅 채널, 음성 채널, 역할의 위치를 변동하거나 수정 혹은 삭제 시 그 전으로 되돌림, 그 사람의 서버 매니저 이상 역할 삭제', true)
        .addField("**[ 기타 규칙 ]**", '•복수 투표 시 경고 1 (서버 매니저 이상은 제외)\n•허락 없이 마음대로 음악을 스킵 하거나 스톱할 시 경고 2 (혼자 있을 시 허용)\n•반성 혹은 모범 행동을 할 시 경고 1 감형 혹은 뮤트 해제\n•규칙에 없는 내용이여도 처벌 가능\n•경고 6일 시 추방', true)
        .setFooter('두둥탁')
        .setTimestamp();
        message.channel.send(embed)
    }

    if(message.content == '~관리자') {
      let embed = new Discord.RichEmbed()
        .setColor('#40e0d0')
        .setTitle('관리자 관련 정보')
        .setThumbnail(message.author.displayAvatarURL)
        .setAuthor(`${message.author.username}`, message.author.displayAvatarURL)
        .addField("**관리자 얻는방법**", '관리자는 아직 안뽑는 중입니다.')
        .addField("**관리자가 하는 일**", '관리자는 말 그대로 서버를 관리하는 사람이며 저희 [문쿠 커뮤니티]를\n새롭고 예쁘게 꾸며나갈 사람 중 하나입니다!', true)
        .setFooter('두둥탁')
        .setTimestamp();
        message.channel.send(embed)

    } else if(message.content == '~help') {
      let helpImg = 'https://images-ext-1.discordapp.net/external/RyofVqSAVAi0H9-1yK6M8NGy2grU5TWZkLadG-rwqk0/https/i.imgur.com/EZRAPxR.png';
      let commandList = [
        {name: 'prefix', desc: '~'},
        {name: 'DM공지', desc: 'dm으로 전체 공지 보내기'},
        {name: 'DM공지2', desc: 'dm으로 전체 embed 형식으로 공지 보내기'},
        {name: '투표', desc: '투표 시스템'},
        {name: 'VIP', desc: 'VIP의 혜택과 얻는 방법을 알려준다.'},
        {name: '규칙', desc: '서버 규칙을 알려준다.'},
        {name: '관리자', desc: '관리자가 하는 일과 얻는 방법을 알려준다.'},
        {name: '봇정보', desc: '두둥탁 봇의 정보를 알려 준다.'},
        {name: '청소', desc: '텍스트 지움'},
        {name: '초대코드', desc: '해당 채널의 초대 코드 표기'},
        {name: '고양이', desc: '고양이 사진 전송'},
        {name: '강아지', desc: '강아지 사진 전송'},
        {name: '게이', desc: '자신이 게이일 확률을 알려줌(놀이용)'},
        {name: '말해', desc: '봇이 따라 말함'},
      ];
      let commandStr = '';
      let embed = new Discord.RichEmbed()
        .setAuthor('명령어 종류', helpImg)
        .setColor('#40e0d0')
        .setFooter(`두둥탁`)
        .setTimestamp()
      
      commandList.forEach(x => {
        commandStr += `• \`\`${changeCommandStringLength(`${x.name}`)}\`\` : **${x.desc}**\n`;
      });
  
      embed.addField('Commands: ', commandStr);
  
      message.channel.send(embed)
    } else if(message.content == '~초대코드2') {
      client.guilds.array().forEach(x => {
        x.channels.find(x => x.type == 'text').createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
          .then(invite => {
            message.channel.send(invite.url)
          })
          .catch((err) => {
            if(err.code == 50013) {
              message.channel.send('**'+x.channels.find(x => x.type == 'text').guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
            }
          })
      });
    } else if(message.content == '~초대코드') {
      if(message.channel.type == 'dm') {
        return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
      }
      message.guild.channels.get(message.channel.id).createInvite({maxAge: 0}) // maxAge: 0은 무한이라는 의미, maxAge부분을 지우면 24시간으로 설정됨
        .then(invite => {
          message.channel.send(invite.url)
        })
        .catch((err) => {
          if(err.code == 50013) {
            message.channel.send('**'+message.guild.channels.get(message.channel.id).guild.name+'** 채널 권한이 없어 초대코드 발행 실패')
          }
        })
    } else if(message.content.startsWith('~DM공지2')) {
      if(checkPermission(message)) return
      if(message.member != null) { // 채널에서 공지 쓸 때
        let contents = message.content.slice('~DM공지2'.length);
        let embed = new Discord.RichEmbed()
          .setTitle('**문쿠 커뮤니티 전체 공지**')
          .setColor('#40e0d0')
          .setFooter(`두둥탁`)
          .setTimestamp()
    
        embed.addField('공지: ', contents);
    
        message.member.guild.members.array().forEach(x => {
          if(x.user.bot) return;
          x.user.send(embed)
        });
    
        return message.reply('공지를 DM으로 전송했습니다!');
      } else {
        return message.reply('채널에서 실행해주세요.');
      }
    } else if(message.content.startsWith('~DM공지')) {
      if(checkPermission(message)) return
      if(message.member != null) { // 채널에서 공지 쓸 때
        let contents = message.content.slice('~DM공지'.length);
        message.member.guild.members.array().forEach(x => {
          if(x.user.bot) return;
          x.user.send(`공지: ${contents}`);
        });
    
        return message.reply('공지를 DM으로 전송했습니다!');
      } else {
        return message.reply('채널에서 실행해주세요.');
      }
    } else if(message.content.startsWith('~청소')) {
      if(message.channel.type == 'dm') {
        return message.reply('dm에서 사용할 수 없는 명령어 입니다.');
      }
      
      if(message.channel.type != 'dm' && checkPermission(message)) return
  
      var clearLine = message.content.slice('~청소 '.length);
      var isNum = !isNaN(clearLine)
  
      if(isNum && (clearLine <= 0 || 100 < clearLine)) {
        message.channel.send("1부터 100까지의 숫자만 입력해주세요.")
        return;
      } else if(!isNum) { // c @나긋해 3
        if(message.content.split('<@').length == 2) {
          if(isNaN(message.content.split(' ')[2])) return;
  
          var user = message.content.split(' ')[1].split('<@!')[1].split('>')[0];
          var count = parseInt(message.content.split(' ')[2])+1;
          let _cnt = 0;
  
          message.channel.fetchMessages().then(collected => {
            collected.every(msg => {
              if(msg.author.id == user) {
                msg.delete();
                ++_cnt;
              }
              return !(_cnt == count);
            });
          });
        }
      } else {
        message.channel.bulkDelete(parseInt(clearLine)+1)
          .then(() => {
            AutoMsgDelete(message, `<@${message.author.id}> ` + parseInt(clearLine) + "개의 메시지를 삭제했습니다. (이 메세지는 잠시 후에 사라집니다.)");
          })
          .catch(console.error)
      }
    }
  });
  
  function checkPermission(message) {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      message.channel.send(`<@${message.author.id}> ` + "명령어를 실행할 권한을 가지고 있지 않습니다.")
      return true;
    } else {
      return false;
    }
  }
  
  function changeCommandStringLength(str, limitLen = 8) {
    let tmp = str;
    limitLen -= tmp.length;
  
    for(let i=0;i<limitLen;i++) {
        tmp += ' ';
    }
  
    return tmp;
  }
  
  async function AutoMsgDelete(message, str, delay = 3000) {
    let msg = await message.channel.send(str);
  
    setTimeout(() => {
      msg.delete();
    }, delay);
  }
  
  
  client.login(token);
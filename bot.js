// Load up the discord.js library
const Discord = require("discord.js");
var SourceQuery = require('sourcequery');

// This is your client. Some people call it `bot`, some people call it `self`, 
const client = new Discord.Client();


// Here we load the config.json file that contains our token and our prefix values. 
// config.token contains the bot's token
// config.prefix contains the message prefix.
const config = require("./config.json");
// Here we load the ip.json file that contains ip of servers
const ip_file = require("./ip.json");

var prefix = config.prefix

client.on("ready", () => {
  client.user.setActivity(`!yardım !jb !ip`);
});


client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // Function to query a csgo server , parse server details, make an embed and then sends on the discord
  function queryserver(ip, port) {
    let sq = new SourceQuery(1000); // 1000ms timeout
    console.log(ip + "  " + port);
    sq.open(ip, port);
    sq.getInfo(function (err, info) {
      if (!err) {
        sq.getPlayers(function (err, players) {
          if (!err) {
            console.log(sq.address);
            var counter = 0;
            playersname = "";
            for (i = 0; i < players.length; i++) {
              playersname = playersname + players[i].name + "\n";
              if (counter == players.length - 1) {
                console.log("Discord Message sent");
                message.channel.send({
                  embed: {
                    color: 3447003,
                    author: {
                      name: client.user.username,
                      icon_url: client.user.avatarURL
                    },
                    title: "Vortex JB",
                    url: "steam://connect/185.193.165.105",
                    fields: [{
                      name: "Sunucu İsmi",
                      value: "**" + info.name + "**"
                    },
                    {
                      name: "Sunucu İp",
                      value: "**connect " + ip + ":" + port + "**",
                      "inline": true
                    },
                    {
                      name: "Şuanki Map",
                      value: info.map,
                      "inline": true
                    },
                    {
                      name: "Maximum Oyuncu",
                      value: info.maxplayers,
                      "inline": true
                    },
                    {
                      name: "Şuanki Oyuncu",
                      value: info.players,
                      "inline": true
                    },
                    {
                      name: "Şuanda Oyundaki Kullanıcılar",
                      value: playersname
                    }
                    ],
                    timestamp: new Date(),
                    footer: {
                      icon_url: client.user.avatarURL,
                      text: "Vortex JailBreak"
                    }
                  }
                });
              }
              counter++;
            }
          }
          else {
            console.log("Error in Players query");
            message.channel.send("Oyuncu Query'sinde Bir Sorun Var.");
          }
        });
      }
      else {
        console.log("Error in info query");
        message.channel.send("Bilgi Query'sinde Bir Sorun Var");
      }
    });
  }

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if (message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix, 
  // which is set in the configuration file.
  if (message.content.indexOf(config.prefix) !== 0) return;

  // Here we separate our "command" name, and our "arguments" for the command. 
  const args = message.content.slice(config.prefix.length).trim().split(/ ss/g);
  var arguments = args.shift().toLowerCase();
  arguments = arguments.split(" ");
  const command = arguments[0];
  console.log(arguments);
  console.log(command);

  // Let's go with a few common example commands! Feel free to delete or change those.
  if (command == "jb") {
    // Function to query all servers at once
    ip_file.IP.forEach((value, key) => {
      console.log(ip_file.IP[key].ip + "  " + ip_file.IP[key].port);
      queryserver(ip_file.IP[key].ip, ip_file.IP[key].port);
    })
  }
});

client.on("message", msg => {
  if (msg.content === prefix + "ip") {
    msg.reply(ip_file.ip);
  }
})

client.on('guildMemberAdd', async member => {

  // Let Tanımları
  let kanal = "957016532318310400";
  let cmfzaman = new Date().getTime() - member.user.createdAt.getTime();
  let cmfzaman2 = new Date().getTime() - member.user.createdAt.getTime()

  // Gerekli Modül
  require("moment-duration-format");

  // Güvenilir & Güvenilir Değil Mesajı
  var CodeMareFi = [];
    if(cmfzaman < 1296000000)
      CodeMareFi = "Güvenilir Değil"
    if(cmfzaman > 1296000000)
      CodeMareFi = "Güvenli"

  // Const Tanımlarımız
  const gecen = moment.duration(cmfzaman2).format(` YY **[Yıl,]** DD **[Gün,]** HH **[Saat,]** mm **[Dakika,]** ss **[Saniye]**`) 

  // Giriş Mesajımız
  client.channels.cache.get(kanal).send(`
    **${member}(\`${member.id}\`) Sunucumuza hoşgeldin dostum. Seninle birlikte \`${member.guild.memberCount}\` kişi olduk. Ses teyit odalarına geçerek kayıt olabilirsin. Ayrıca tagımızı alarak bize destek olabilirsin \`tag\` :tada:**
    \n
      \t**Hesap açılalı \`${gecen}\` olmuş.**
      \t**Kullanıcı ${CodeMareFi}.**
  `)

  
  // Girişte Kullanıcıya Verilecek Rol(ler)
  member.roles.add('957016651436552263')

})

client.login(config.token);

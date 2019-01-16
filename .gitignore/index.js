const Discord = require("discord.js");
const bot = new Discord.Client(); 

var prefixs = '%'
var randnum = 0;

bot.on('ready', function () {
  //bot.user.setGame('se faire dev! | *help')
})



bot.on('message', function (message){
    
})

bot.on('message', function (message){
  if (message.content === prefixs + "help"){
    var help_embed = new Discord.RichEmbed()
   .setColor('RANDOM')
   .setTitle('Voici les commandes disponible')
   .setDescription('Les commandes sont :')
   .addField('%mod','Affiche les commandes de modérateur')
   .addField('%fun','Affiche les commmandes fun')
   .setFooter("Menu d'aide - MAJ le 13/01/19")
    message.channel.send(help_embed)
    console.log("La commande d'aide à été effectuer  dans le serveur " + message.guild.name + "' par " + message.author.username + "");
  }

  if (message.content === prefixs + "fun"){
    var help_embed = new Discord.RichEmbed()
   .setColor('RANDOM')
   .setTitle('Voici les commandes fun')
   .setDescription('Les commandes sont :')
   .addField('pfc','Pierre,Feuille,Ciseaux')

   .addField('%ping',"En développement")
   .setFooter("Menu de jeux - MAJ le 13/01/19")
    message.channel.send(help_embed)
    console.log("La commande d'aide aux jeux à été affiché avec succès dans le serveur " + message.guild.name + "' par " + message.author.username + "");
  }

  if (message.content === prefixs + 'mod'){
    var help_modo = new Discord.RichEmbed()
    .setColor('RANDOM')
    .setTitle('Commande de modérateur')
    .setDescription('Voici les commandes disponibles :')
    .addField('%clear <nb>','Supprime un nombre de messages spécifiques')
    .addField('%kick <@user>',"Kick l'utilisateur mentionner")
    .addField('%ban <@user>','Ban un utilisateur en particulier')
    .addField('%mute <@user>',"Mute l'utilisateur mentionnner")
    .addField('%userinfo <@user>', "Affiche les information de l'utilisateur mentionner")
    .addField('%infodiscord', "Affiche les information du discord")
    .setFooter("Menu d'aide de modérateur - MAJ le 13/01/19")
    message.channel.send(help_modo)
    console.log("Le panneau d'aide pour modérateur à été affiché avec succès dans le serveur '" + message.guild.name + "' par " + message.author.username + "");
  }

  if (message.content === prefixs + "infodiscord") {
     var embed = new Discord.RichEmbed()
     .setDescription('Information du discord')
     .addField("Nom du discord", message.guild.name)
     .addField("Crée le", message.guild.createdAt)
     .addField("Tu as rejoin le", message.member.joinedAt)
     .addField("Utilisateur et bot du discord", message.guild.memberCount)
     .setColor("RANDOM")
     .setFooter("MAJ le 13/01/19")
     message.channel.send({embed})
     console.log("Les information concernant le serveur " + message.guild.name + " ont été affiché par " + message.author.username + "");
  }

  

  if(message.content.startsWith(prefixs + "kick")) {
    if(!message.guild.member(message.author).hasPermission("KICK_MEMBERS")) return message.channel.send("**:x: Tu ne peux pas effectuer cette commande !**").then(msg => msg.delete (2000))
    if(message.mentions.users.size === 0) {
      return message.channel.send("**:x: Vous devez mentionnez une personne pour kick !**").then(msg => msg.delete (2000))
    }
    var kick = message.guild.member(message.mentions.users.first());
    if(!kick) {
     return message.channel.send("**:x: L'utilisateur est introuvable !**").then(msg => msg.delete (2000))
    }
    if(!message.guild.member(bot.user).hasPermission("KICK_MEMBERS")) {
      return message.channel.send("**:x: Je n'ai pas la permission de kick cet utilisateur !**").then(msg => msg.delete (2000))
    }
    kick.kick().then(member => {
      message.channel.send(`**:white_check_mark: ${member.user.username} à été kick avec succès**`).then(msg => msg.delete (2000))
      console.log("Un utilisateur à été kick sur " + message.guild.name + " par " + message.author.username + "");
    });
  }

  if(message.content.startsWith(prefixs + "ban")) {
    if(!message.guild.member(message.author).hasPermission("BAN_MEMBERS")) return message.channel.send("**:x: Tu ne peux pas effectuer cette commande !**").then(msg => msg.delete (2000))
    if(message.mentions.users.size === 0) {
      return message.channel.send("**:x: Vous devez mentionnez une personne pour kick !**").then(msg => msg.delete (2000))
    }
    var ban = message.guild.member(message.mentions.users.first());
    if(!ban) {
     return message.channel.send("**:x: L'utilisateur est introuvable !**").then(msg => msg.delete (2000))
    }
    if(!message.guild.member(bot.user).hasPermission("BAN_MEMBERS")) {
      return message.channel.send("**:x: Je n'ai pas la permission de kick cet utilisateur !**").then(msg => msg.delete (2000))
    }
    ban.ban().then(member => {
      message.channel.send(`**:white_check_mark: ${member.user.username} à été ban avec succès**`).then(msg => msg.delete (2000))
      console.log("Un utilisateur à été kick sur " + message.guild.name + " par " + message.author.username + "");
    });
  }

  if(message.content.startsWith(prefixs +"clear")) {
    if(!message.guild.member(message.author).hasPermission("MANAGE_MESSAGES")) return message.channel.send("Vous ne pouvez pas effectuer cette commande !").then(msg => msg.delete (2000))

    let args = message.content.split(" ").slice(1)

    if(!args[0]) return message.channel.send("Tu dois préciser un nombre de message à supprimer ! ").then(msg => msg.delete (2000))
    message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`${args[0]} messages ont été supprimés !`).then(msg => msg.delete (2000))
      console.log("Un clear à été effectuer sur " + message.guild.name + " par " + message.author.username + "");
    })
  }

  if(message.content.startsWith(prefixs + 'mute')) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas les droits requis").then(msg => msg.delete (2000))

    if(message.mentions.users.size === 0){
      return message.channel.send("Vous devez mentionner un utilisateur !").then(msg => msg.delete (2000))
    }

    var mute = message.guild.member(message.mentions.users.first())
    if(!mute) {
      return message.channel.send("Je ne trouve pas l'utilisateur").then(msg => msg.delete (2000))
    }

    if(!message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission").then(msg => msg.delete (2000))
    message.channel.overwritePermissions(mute, { SEND_MESSAGES: false}).then(member => {
      message.channel.send(`${mute.user.username} est mute !`).then(msg => msg.delete (2000))
      console.log("Un utilisateur à été mute sur " + message.guild.name + " par " + message.author.username + "");
    });
  }

  if(message.content.startsWith(prefixs + 'unmute')) {
    if(!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Vous n'avez pas les droits requis").then(msg => msg.delete (2000))

    if(message.mentions.users.size === 0){
      return message.channel.send("Vous devez mentionner un utilisateur !").then(msg => msg.delete (2000))
    }

    var mute = message.guild.member(message.mentions.users.first())
    if(!mute) {
      return message.channel.send("Je ne trouve pas l'utilisateur").then(msg => msg.delete (2000))
    }

    if(!message.guild.member(bot.user).hasPermission("ADMINISTRATOR")) return message.channel.send("Je n'ai pas la permission")
    message.channel.overwritePermissions(mute, { SEND_MESSAGES: true}).then(member => {
      message.channel.send(`${mute.user.username} n'est plus mute !`).then(msg => msg.delete (2000))
      console.log("Un utilisateur à été unmute sur " + message.guild.name + " par " + message.author.username + "");
    });
  }

  if(message.author.bot) return;
             if(message.content.startsWith(prefixs + "userinfo") || message.content.startsWith("*ui")) {
           
               let usera = message.mentions.members.first();
               if(!usera) return message.channel.send("Précise moi un utilisateur");
               let gameName = usera.presence.game ? usera.presence.game.name : "None";
           
           
               var embed = new Discord.RichEmbed()
               .setAuthor(usera.user.tag, usera.user.avatarURL)
               .addField("ID de l'utilisateur", usera.id, true)
               .addField("Pseudo", usera.user.username, true)
               .addField("Status actuel", usera.presence.status, true)
               .addField("Jeu", gameName, true)
               .addField("Quand à t'il join ?", usera.joinedAt, true)
               .setTimestamp()
               .setColor(0x0f7fa6)
               .setThumbnail(usera.user.avatarURL);
               message.channel.send({embed});
           
               console.log("L'info d'utilisateur à été demandé dans le serveur " + message.guild.name + " par " + message.author.username + "");
           }
  

  if (message.content === 'pfc') {
    random()
  
    if (randnum == 1){
      message.channel.send('Pierre')
    }
  
    if (randnum == 2){
      message.channel.send('Feuille')
    }

    if (randnum == 3){
      message.channel.send('Ciseaux')
    }
  }
    

});

function random(min, max) {
  min = Math.ceil(0)
  max = Math.floor(3)
  randnum = Math.floor(Math.random() * (max - min +1) + min)
}


bot.login('NTM0ODAzNjMzODU5MTk4OTg3.Dx-62A.fxag2Brw2LRhFOed7cJTFNy3qp0')

bot.on("ready", () => {
  console.log("Je suis prêt pour la faction!")
})

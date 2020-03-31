const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const colours = require("./colours.json");
const rChannel = "687319158215409696"
const rServer = "683678450477039658"
const perms = require("./perms.json");
var fs = require("file-system");
const gbanned = require("./gbanned.json");


var mongoPassword = 'JKGFklkajfgewilfgwuilKJFU8768759jfg';
			
var http = require('http');
var server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });

  var config = JSON.parse(process.env.APP_CONFIG);
  var MongoClient = require('mongodb').MongoClient;

  MongoClient.connect(
    "mongodb://" + config.mongo.user + ":" + encodeURIComponent(mongoPassword) + "@" + 
    config.mongo.hostString, 
    function(err, db) {
      if(!err) {
        res.end("We are connected to MongoDB");
      } else {
        res.end("Error while connecting to MongoDB");
      }
    }
  );
});
server.listen(process.env.PORT);



const bot = new Discord.Client({disableEveryone: true});


bot.on("ready", async () => {
    console.log(`${bot.user.username} jest online`)
  bot.user.setActivity(",pomoc", {type: "STREAMING"});


})


bot.on("message", async message => {
    if(message.author.bot || message.channel.type === "dm") return;
    

    let prefix = botconfig.prefix;
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0];
    let args = messageArray.slice(1);
    
    


   

   




// ==============-------{ COMMANDS \/}---------================\\







if(cmd === `${prefix}serwerinfo`){
    let sEmbed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setTitle("Informacje o Serwerze")
    .setThumbnail(message.guild.iconURL())
    .setAuthor(`${message.guild.name} Info`, message.guild.iconURL)
    .addField("**Nazwa Serwera:**", `${message.guild.name}`, true)
    .addField("**Właściciel:**", `${message.guild.owner}`, true)
    .addField("**Ilość Użytkowników:**", `${message.guild.memberCount}`, true)
    .addField("**Ilość Ról:**", `${message.guild.roles.cache.size}`, true)
    .setFooter(`Reklamodawca`, bot.user.displayAvatarURL());
    message.channel.send({embed: sEmbed});
    return;
}


// ==============-------{ COMMAND 1 [servinfo] /\ }---------================\\




if(cmd === `${prefix}userinfo`){
  var mentioneduserinfo = message.mentions.users.first();
  var mentionedcreat = message.mentions.users.createdAt
  if(!mentioneduserinfo){
    let uEmbed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setTitle("Informacje o Użytkowniku")
    .setThumbnail(message.author.displayAvatarURL())
    .setAuthor(`${message.author.username} Info`, message.guild.displayAvatarURL)
    .addField("**Nazwa użytkownika:**", `${message.author.username}`, true)
    .addField("**Tag:**", `${message.author.discriminator}`, true)
    .addField("**ID:**", `${message.author.id}`, true)
    .addField("**Status:**", `${message.author.presence.status}`, true)
    .addField("**Stworzono:**", `${message.author.createdAt}`, true)
    .setFooter(`Reklamodawca`, bot.user.displayAvatarURL());
    message.channel.send({embed: uEmbed});
  }else{
 
    
message.channel.send("lel");
  }
   return; 
}



// ==============-------{ COMMAND 2 [uinfo] /\ }---------================\\

if(cmd === `${prefix}setchannel`) {
var channel_1_1 = message.mentions.channels.first();
var chann_id = message.mentions.channels.id

if(!message.member.hasPermission(`ADMINISTRATOR`)) {
  let brakpermchannelEmbed = new Discord.MessageEmbed()
  .setTitle("Uwaga!")
  .setColor("#ffffff")
  .setDescription("Tylko użytkownik z permisjami `ADMINISTRATOR`a może używac tej komendy!")
 return message.channel.send({embed: brakpermchannelEmbed});
return;
}else{

if(!channel_1_1) {

 let oznaczEmbed = new Discord.MessageEmbed()
 .setTitle("Uwaga!")
 .setColor("#ffffff")
 .setDescription("Musisz oznaczyć kanał aby go ustawić")
 .setFooter("Oznacz kanał")
 message.channel.send({embed: oznaczEmbed})
 
 return;
}else{

 let okejEmbed = new Discord.MessageEmbed()
 .setTitle("Ustawiono!")
 .setColor("#ffffff")
 .setDescription("Twój kanał z reklamami został ustawiony poprawnie!")
 .setFooter("Kanał został ustawiony!")
 message.channel.send({embed: okejEmbed})
 return;
}}
return;
}








// ==============-------{ COMMAND 3 [setchannel] /\ }---------================\\

 if(cmd === `${prefix}setadd`){

var cnt = args.join(" ")
const rChannel = "687319158215409696"
var ustawil = message.author.username
var server_id = message.guild.id
var id_reklamy = message.id
var id_typa = message.author.id
var name_serwa = message.guild.name

if(cnt.length > 36 && (cnt.length < 1001)) {

let wyslanoEmbed = new Discord.MessageEmbed()
.setTitle("Wysłano!")
.setColor("#ffffff")
.setDescription("Twoja reklama została poprawnie wysłana do sprawdzenia!")
.addField("Treść reklamy:", `${cnt}`)
.setFooter("Max czas oczekiwania to: 12h")
message.channel.send({embed: wyslanoEmbed})
bot.users.cache.get(`${id_typa}`).send({embed: wyslanoEmbed});

let zreklamoEmbed = new Discord.MessageEmbed()
.setTitle("Reklama!")
.setColor("#ffffff")
.addField("Wysłał", `${ustawil}`)
.addField("Jego ID:", `${id_typa}`)
.addField("Z serwera", `${name_serwa}`)
.addField("ID Serwera:", `${server_id}`)
.addField("ID Reklamy:", `${id_reklamy}`)
.addField("Treść", `${cnt}`)
.setFooter("Reklama", bot.user.displayAvatarURL())
bot.guilds.cache.get("683678450477039658").channels.cache.get("687319158215409696").send({embed: zreklamoEmbed});

}else{
 let krutkaembed = new Discord.MessageEmbed()
 .setTitle("Nie wysłano!")
 .setColor("#ffffff")
 .setDescription("Twoja reklama nie została wysłana, powodem tego jest jej zawartość. \n\n __Wymagania:__ \n\n - Reklama musi zawierać minimalnie 30 znaków. \n - Reklama nie może zwierać przekleństw, treści niestosownych oraz danych osobowych. \n - Reklama musi zawierać link do tego serwera, który **nigdy nie wygaśnie** \n - Nie spam reklamą (max. 3 pod rząd) \n - Po wysłaniu reklamy poczekaj cierpliwie na sprawdzenie jej.\n")
 .setFooter("Zasady wysyłania reklam")
 message.channel.send({embed: krutkaembed})
 return;
}};









// ==============-------{ COMMAND 4 [setadd] /\ }---------================\\

if(cmd === `${prefix}status`) 





// ==============-------{ COMMAND 5 [status] /\ }---------================\\


if (cmd === `${prefix}avatar`) {
	if (args[0]) {
		const user = getUserFromMention(args[0]);
		if (!user) {
			return message.reply('Please use a proper mention if you want to see someone else\'s avatar.');
		}

		return message.channel.send(`${user.username}'s avatar: ${user.displayAvatarURL({ dynamic: true })}`);
	}else{

	return message.channel.send(`${message.author.username}, your avatar: ${message.author.displayAvatarURL({ dynamic: true })}`);
};
};

// ==============-------{ COMMAND 6 [avatar] /\ }---------================\\


if(cmd === `${prefix}pomoc`) {
    

    let pEmbed = new Discord.MessageEmbed()
    .setTitle("Komenda Pomocy")
    .setThumbnail(bot.displayAvatarURL)
    .setColor(colours.pink)
    .setDescription("**Dostępne Komendy:** \n\n __REKLAMY:__ \n\n``` setchannel, setadd, ~~status~~, ~~info~~ `[Chwilowo niedostępne]` \n\n```\n __POMOC:__ \n\n``` pomoc, link, poradnik, reklamy, warunki \n\n```")
    .setFooter(`Reklamodawca`, bot.user.displayAvatarURL())
    message.channel.send({embed: pEmbed})

   
return;
};

// ==============-------{ COMMAND 7 [pomoc] /\ }---------================\\



if(cmd === `${prefix}link`) {
    

    let lEmbed = new Discord.MessageEmbed()
    .setTitle("Ważne Linki")
    .setColor(colours.blue)
    .setDescription("\n[Serwer Support](https://discord.gg/6dvzHad) \n\n[YouTube](http://www.youtube.com) \n\n[Twórcy](https://discord.gg/5TUaZZG) \n\n [Zaproś bota na sewer](https://discordapp.com/oauth2/authorize?client_id=685951161190449318&scope=bot&permissions=2080898303)\n")
    .setFooter("Reklamodawca |", bot.user.displayAvatarURL())
    return message.channel.send({embed: lEmbed})

    
    
};


// ==============-------{ COMMAND 8 [link] /\ }---------================\\

if(cmd === `${prefix}poradnik`){
  



  let poradEmbed = new Discord.MessageEmbed()
  .setTitle("Poradnik")
  .setColor("#ffffff")
  .setDescription("__**Znajdziesz w nim informacje na temat:**__ \n [Jak skonfigurować bota?]() \n\n [Jak stworzyć super reklamę?]() \n\n [Co to globalban?]() \n\n [Czy moja reklama może znaleźć się na czarnej liście?]() \n\n\n\n\n")
  .setFooter("Najczęstsze pytania", bot.user.displayAvatarURL())
  message.channel.send({embed: poradEmbed})
  return;
}











// ==============-------{ COMMAND 9 [poradnik] /\ }---------================\\

if(cmd === `${prefix}reklamy`) {

if (message.author.id === gbanned.ids) {
return message.channel.send("Wygląda na to, że Cię __zbanowano__, więc **nie możesz używać** tego bota")
}else{
  let reklaEmbed = new Discord.MessageEmbed()
  .setTitle("Jak ustawić reklamę?")
  .setColor("#ffffff")
  .setDescription("By ustawić reklamę podążaj za instrukcją! \n\n  1. Ustaw kanał, na który będą wysyłane reklamy - komdenda: `,setchannel [#kanał]` \n\n  2. Ustaw reklamę, pamiętaj aby spełniała wymagania. Pewnie zapytasz jakie? Sprawdź to pod komendą: `,setadd` , jeśli Twoja reklama je spełnia ustaw ją - komenda: `,setadd [treść]` \n\n  3. Cierpliwie poczekaj aż administracja bota sprawdzi reklamę, zajmuje to im ok. 10h \n\n  4. Jeżeli doczekałeś się sprawdzenia reklamy możesz cieszyć się zwiększeniem zasięgów Twojego serwera, **Gratulacje!** \n\n\n")
  .setFooter("Reklamodawca", bot.user.displayAvatarURL());
  message.channel.send({embed: reklaEmbed})
  return;
}






}
// ==============-------{ COMMAND 10 [reklamy] /\ }---------================\\




if(cmd === `${prefix}clear`){

 
  const deleteCount = parseInt(args[0], 10);
 
  if(message.guild.id !== "683678450477039658"){
    return message.channel.send("[REVOKE] Ta komenda działa tylko na oficialnym serwerze bota!");

  }else{

  if(!deleteCount || deleteCount < 2 || deleteCount > 100){
    return message.reply("Wprowadź ilość między 2 a 100")
  
  }else{

    message.channel.bulkDelete(deleteCount)
    let usunietoEmbed = new Discord.MessageEmbed()
    .setColor("#ffffff")
    .setDescription(`${message.author.username} Usunął ${deleteCount} wiadomości!`)
    .setFooter("Reklamodawca Private Command")
    message.channel.send({embed: usunietoEmbed});

    delete(usunietoEmbed);
    

}}}



















if(cmd === `${prefix}accept`) {

var id_rekl = message.content
var sprawdzal = message.author.username

if(message.author.id !== perms.ids) {
  message.channel.send("Brak permisji!")
}else{

if(id_rekl.length !== 26){
  
  return message.channel.send("Poprawne użycie komendy to: `,accept [id reklamy]`");

}else{
  let acceptEmbed = new Discord.MessageEmbed()
  .setTitle("Zaakceptowano")
  .setColor("#ffffff")
  .addField("Wysłał", `${ustawil}`)
  .addField("Treść", `${cnt}`)
  .addField("Reklamę sprawdzał", `${sprawdzal}`)
  bot.users.cache.get(`456343371720425473`).send({embed: acceptEmbed});
}
}






};

if(cmd === `${prefix}warunki`){
  var wywolal = message.author.username
 




  let warunekEmbed = new Discord.MessageEmbed()
  .setTitle("Ważne!")
  .setColor("#ffffff")
  .setDescription("\n\n **Warunki korzystania z bota __Reklamodawca__:**\n\n[CLICK]() \n\n **Regulamin:**\n\n[CLICK]() \n\n **FAQ:**\n\n[CLICK]()\n\n")
  .setFooter(`Wywołano przez: ${wywolal}`)
 return message.channel.send({embed: warunekEmbed})
}




if(cmd === `${prefix}giveinvite`) {
  let invite = message.channel.createInvite()
  let serv = message.content
  bot.guilds.cache.find(guild => guild.id === message.content)
  return message.channel.send(`${invite} na serwer ${message.content}`)   
}

if(cmd === `${prefix}serwery`) {





  let serwer = bot.guilds.size

return message.channel.send(`Serwery bota: ${serwer}`)

}








// ==============-------{ COMMAND 10 [clear] /\ }---------================\\

//if(cmd === `{prefix}gban`) {
//  let gban = args[1];
 // if(message.author.id === perms.ids){
 ///  if(!gban){
  //   message.channel.send("Podaj id delikwenta!");
  // } else{
//    fs.writeFile(`./gbanned ${gban} .txt`, 'utf8', function (err) {
   //   if (err) throw err;
   //   message.reply('Character created successfully.');
   //   console.log('File created successfully.');
 // });
     
    
   
 // }
});



//if(cmd === `${prefix}gban`) {

//var gban = message.content

//if(message.author.id !== "456343371720425473"){


 // return message.channel.send("[REVOKE] Brak permisji!");

//}else{
 // if(!gban){


 //  return message.channel.send("Podaj id")

 // }else{

  //  fs.writeFile(`./gbanned.json`, "{ids":" `message.content` "}" , function (err) {
  //    if (err) throw err;
   //   message.reply("Zbanowano", message.channel.content)
    //  console.log('File created successfully.');

//});
//}}};






 // fs.writeFile(`./gbanned.txt`, 'utf8', function (err) {
  //    if (err) throw err;
  //    message.reply('Character created successfully.');
  //    console.log('File created successfully.');
 // });
//}






//if(!gban){

 // return message.channel.send("Podaj id delikwenta!")

//  }else{
//fs.writeFile(`./gbanned.json`, `utf`, function (err) {
 // if(err) throw err;
 // message.reply('Zbanowano ${gban}');
 // console.log('File created successfully.');
//})
 // }




//const mysql = require('mysql');
//const connection = mysql.createConnection({
 // host     : 'myhost',
 // port     : '3306',
 // user     : 'myuser'
 // password : 'mypassword',
 // database : 'mydatabase',
 // charset : 'utf8mb4'
//});








//if (command === "asl") {
 // let age = args[0]; // Remember arrays are 0-based!.
  //let sex = args[1];
 // let location = args[2];
 // message.reply(`Hello ${message.author.username}, I see you're a ${age} year old ${sex} from ${location}. Wanna date?`);
//}





// ==============-------{ COMMAND 11 [] /\ }---------================\\








bot.login(botconfig.token)
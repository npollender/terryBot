require('dotenv').config()

var Discord = require('discord.js')
var http = require('http')
var channel_id = '172788488884715520' //twitchchat id
var user_terry = '172794384524378112' //terry id
var user_david = '276504337734303755' //david id

http.createServer(function(req, res) {
  res.write('alive')
  res.end()
}).listen(8080)

const client = new Discord.Client({
  intents: [
    //Discord.GatewayIntentBits.DirectMessages,
    Discord.GatewayIntentBits.GuildMessages,
    Discord.GatewayIntentBits.GuildMembers,
    Discord.GatewayIntentBits.GuildMessageReactions,
    Discord.GatewayIntentBits.GuildMessageTyping,
    Discord.GatewayIntentBits.Guilds,
    Discord.GatewayIntentBits.MessageContent
  ],
  partials: [Discord.Partials.Channel]
})

client.on('ready', async () => {
  console.log('Logged in!')
  setInterval(async () => {
    const status = ['it is terrys birthday my dudes',
      'terry womb exiting day',
      'hbd terrance!!!!!!!',
      'TERRY BIRD DAY CELEBRATION',
      'terry terry terry terry terry terry terry terry terry',
      'hpayiori birthADY TEETRHEURIHY']
    var rand = Math.floor(Math.random() * (status.length))
    var act = status[rand]
    client.user.setActivity(act)
    //console.log('Status set to ' + act)
  }, 1000 * 30) //30 sec
  setInterval(async () => {
    const channel = await client.channels.fetch(channel_id)
    channel.send({
      content: 'HAPPY BIRTHDAY TERRY!'
    })
    console.log('Message sent.')
  }, 1000 * 60 * 60 * 24) //24 hr
})

client.on('messageCreate', async (msg) => {
  //console.log('msg found')
  if (msg.author.bot) { return }
  //console.log('not a bot')
  let msgs = ['yo thats what im saying!',
    'fr fr happy birthday terrrrryyyy!!!!',
    'this is pretty true',
    'OMG YES HBD TERRANCE',
    'aaayyyyy lets gooooo',
    'happy birf day tewwy',
    'gentlemen, it is with great pleasure to inform you that it is terrys birthday',
    'me when its terrys birthday',
    'aka essence reaver tryndamere appreciation day',
    'a birthday a day keeps the dogtor away',
    'nice',
    'hApPy BiRtHdAy TeRrY',
    'gimornous birthday time mhm',
    'happy michigan birthday*',
    'cap',
    'imagine not having a birthday today lmaooooooooo',
    'HAPOPOYIO BHJKRIOTHATY YERTYRETY!!!!!!!']
  if (msg.content.toLowerCase().includes('happy birthday terry') ||
    msg.content.toLowerCase().includes('hbd terry') ||
    (msg.content.toLowerCase().includes('happy') &&
      msg.content.toLowerCase().includes('birthday') &&
      msg.content.toLowerCase().includes('terry'))) {
    //console.log('hbd found')
    var rand = Math.floor(Math.random() * (msgs.length))
    var send = msgs[rand]
    msg.reply(send)
  }
  else if (msg.author.id === user_terry) {
    var rand = Math.floor(Math.random() * 100)
    if (rand < 10) {
        msg.reply(funnyMessage(msg.content.toLowerCase()))
    }
  }
  else if (msg.author.id === user_david && !msg.content.contains('?') && msg.content.length > 10) {
    var rand = Math.floor(Math.random() * 100)
    if (rand < 20) {
      var rep = ['who asked',
                 'any askers?',
                 'ooooh true! I didnt ask!',
                 'thats crazy man but no one asked',
                funnyMessage(msg.content.toLowerCase())]
      rand = Math.floor(Math.random() * rep.length)
      msg.reply(rep[rand])
    }
  }
})

client.on('typingStart', async (user) => {
  const channel = await client.channels.fetch(channel_id)
  if (user.user.id === user_terry) {
    //console.log('typing detected')
    await new Promise(r => setTimeout(r, 2000));
    var rand = Math.floor(Math.random() * 100)
    if (rand < 20) {
      let msg = ['nobody asked terry',
                 'stop typing terry',
                 'shut up terry']
      rand = Math.floor(Math.random() * msg.length)
      channel.send({
        content: msg[rand]
      })
    }
    await new Promise(r => setTimeout(r, 10000));
  }
})

client.login(process.env.DISCORD_TOKEN)

function funnyMessage(msg) {
    var new_msg = ''
    for (i = 0; i < msg.length; i++) {
      try {
        new_msg += i % 2 == 0 ? msg.charAt(i).toUpperCase() : msg.charAt(i)
      } catch {/*do nothing xD*/}
    }
    return new_msg
}
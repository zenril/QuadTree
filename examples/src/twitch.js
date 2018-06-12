const TwitchBot = require('twitch-bot');
 
const Bot = new TwitchBot({
  username: 'Kappa_Bot',
  oauth: 'oauth:dwiaj91j1KKona9j9d1420',
  channels: ['twitch']
})
  
Bot.on('join', () => {
 
  Bot.on('message', chatter => {
    if(chatter.message === '!test') {
      Bot.say('Command executed! PogChamp')
    }
  })
})
 
Bot.on('error', err => {
  console.log(err)
})
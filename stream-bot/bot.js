const apiKeys = require('./.env').apiKeys;
const Twit = require('twit');
const userIds = require('./.env').userIds;
const answers = require('./answers.json');

class Bot {
  constructor() {
    this.api = new Twit(apiKeys);
  }

  watchUserTweets(userId) {
    const stream = this.api.stream('statuses/filter', {follow: userId})
      .on('tweet', tweet => {
        const tweetId = tweet.id_str;
        const username = tweet.user.screen_name;
        this.api.post('statuses/update', {in_reply_to_status_id: tweetId, status: `${this.getRandomAnswer(answers)} @${username}`})
          .then(console.log(`Successful tweet`))
          .catch(error => console.log(error.stack));
      })
      .on('error', error => console.log(error.stack));
  }

  getRandomAnswer(collection) {
    return collection[Math.floor(Math.random()*((collection.length-1)-0+1)+0)];
  }

}


//node execution area
const bot = new Bot();

bot.watchUserTweets(userIds.content_bot1000);

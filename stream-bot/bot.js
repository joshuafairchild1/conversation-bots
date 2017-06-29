const apiKeys = require('./.env').apiKeys;
const Twit = require('twit');
const userIds = require('./.env').userIds;

class Bot {
  constructor() {
    this.api = new Twit(apiKeys);
  }

  watchUserTweets(userId) {
    const stream = this.api.stream('statuses/filter', {follow: userId})
    .on('tweet', (tweet) => console.log(tweet.text))
    .on('error', error => console.log(error));
  }
}


const bot = new Bot();
bot.watchUserTweets(userIds.content_bot1000);

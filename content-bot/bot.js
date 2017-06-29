const apiKeys = require('./.env').apiKeys;
const Twit = require('twit');
// const tweetRate = 1000*70;

class Bot {
  constructor() {
    this.api = new Twit(apiKeys);
  }

  postTweet(content) {
    this.api.post('statuses/update', {status: content})
      .then(console.log(`Successful tweet:  ${content}`))
      .catch(error => console.log(`Error occurred:  ${error.stack}`));
  }
}

//node execution area
const bot = new Bot();

bot.postTweet('hello worm');

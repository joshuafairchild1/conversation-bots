const apiKeys = require('./.env').apiKeys;
const Twit = require('twit');
const questions = require('./questions.json');
// const tweetRate = 1000*70;

class Bot {
  constructor() {
    this.api = new Twit(apiKeys);
  }

  postTweet() {
    const question = this.getRandomQuestion(questions);
    this.api.post('statuses/update', {status: question})
      .then(console.log(`Successful tweet:  ${question}`))
      .catch(error => console.log(`Error occurred:  ${error.stack}`));
  }

  getRandomQuestion(collection) {
    return collection[Math.floor(Math.random()*((collection.length-1)-0+1)+0)];
  }
}

//node execution area
const bot = new Bot();

bot.postTweet();

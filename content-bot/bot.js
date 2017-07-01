const apiKeys = require('./.env').apiKeys;
const Twit = require('twit');
const questions = require('./questions.json');
const proverbs = require('./proverbs.json');
const tweetRate = 1000*10;

class Bot {
  constructor() {
    this.api = new Twit(apiKeys);
  }

  postTweet(collection) {
    const content = this.generateRandomContent(collection);
    this.api.post('statuses/update', {status: content})
      .then(console.log(`Successful tweet:  ${content}`))
      .catch(error => console.log(`Error occurred:  ${error.stack}`));
  }

  generateRandomContent(collection) {
    const rand1 = this.getRandomItem(collection).split(" ");
    const rand2 = this.getRandomItem(collection).split(" ");

    const firstHalf = rand2.splice(0, Math.floor(rand2.length / 2)).join(" ");
    const secondHalf = rand1.splice(Math.floor(rand1.length / 2)).join(" ");

    return`${firstHalf} ${secondHalf}`;
  }

  getRandomItem(collection) {
    return collection[Math.floor(Math.random()*((collection.length-1)-0+1)+0)]
  }
}

  //=======================//
 //  node execution area  //
//=======================//
const bot = new Bot();

// bot.postTweet(proverbs);
// bot.postTweet(questions);

setInterval(() => bot.postTweet(proverbs), tweetRate);
// setInterval(() => bot.postTweet(questions), tweetRate);

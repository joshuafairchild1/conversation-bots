const apiKeys = require('./.env').apiKeys;
const Twit = require('twit');
const questions = require('./questions.json');
const proverbs = require('./proverbs.json');
const tweetRate = 1000*70;

class Bot {
  constructor() {
    this.api = new Twit(apiKeys);
  }

  postQuestion() {
    const question = this.generateRandomItem(questions);
    // const question = '14 worms?';
    this.api.post('statuses/update', {status: question})
      .then(console.log(`Successful tweet:  ${question}`))
      .catch(error => console.log(`Error occurred:  ${error.stack}`));
  }

  postProverb() {
    const proverb = this.generateRandomItem(proverbs);
    // const proverb = "14 worms?";
    this.api.post('statuses/update', {status: proverb})
      .then(console.log(`Successful tweet:  ${proverb}`))
      .catch(error => console.log(`Error occurred:  ${error.stack}`));
  }

  getRandomQuestion(collection) {
    return collection[Math.floor(Math.random()*((collection.length-1)-0+1)+0)];
  }

  generateRandomItem(collection) {
    const rand1 = collection[Math.floor(Math.random()*((collection.length-1)-0+1)+0)].split(" ");
    const rand2 = collection[Math.floor(Math.random()*((collection.length-1)-0+1)+0)].split(" ");

    const firstHalf = rand2.splice(0, Math.floor(rand2.length / 2)).join(" ");
    const secondHalf = rand1.splice(Math.floor(rand1.length / 2)).join(" ");

    return`${firstHalf} ${secondHalf}`;
  }
}

//node execution area
const bot = new Bot();

// bot.postProverb();
// bot.postQuestion();

setInterval(() => bot.postProverb(), tweetRate);
// setInterval(() => bot.postQuestion(), tweetRate);

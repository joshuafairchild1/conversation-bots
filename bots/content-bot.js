const contentBotKeys = require('./../.env').contentBotKeys;
const Twit = require('twit');

module.exports = class ContentBot {
  constructor() {
    this.api = new Twit(contentBotKeys);
  }

  async postTweet(collection) {
    const content = this.generateRandomContent(collection);
    try {
      const postedTweet = await this.api.post('statuses/update', {status: content});
      console.log(`Content bot: ${postedTweet.data.text}`);
    } catch(err) {
      console.log(`Error occurred:  ${err.stack}`);
    }
  }

  generateRandomContent(collection) {
    const rand1 = this.getRandomItem(collection).split(" ");
    const rand2 = this.getRandomItem(collection).split(" ");

    const firstHalf = rand2.splice(0, Math.floor(rand2.length / 2)).join(" ");
    const secondHalf = rand1.splice(Math.floor(rand1.length / 2)).join(" ");

    return`${firstHalf} ${secondHalf}`;
  }

  getRandomItem(collection) {
    return collection[Math.floor(Math.random()*collection.length)];
  }
}

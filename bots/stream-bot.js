const streamBotKeys = require('./../.env').streamBotKeys;
const Twit = require('twit');
const answers = require('./../assets/answers.json');

module.exports = class StreamBot {
  constructor() {
    this.api = new Twit(streamBotKeys);
  }

  async watchUserTweets(usersArray, replyType) {
    const users = usersArray.join()
    this.api.stream('statuses/filter', {follow: users})
      .on('tweet', tweet => {
        switch (replyType) {
          case 'answer': this.reply(tweet, this.getRandomAnswer, answers);
            break;
          case 'alphabetize': this.reply(tweet, this.alphabetizeTweet);
            break
        }
      })
      .on('error', error => console.log(`Error occurred:  ${err.stack}`));
  }

  async reply(tweet, tweetBuilder, contentCollection = null) {
    const tweetId = tweet.id_str;
    const username = tweet.user.screen_name;
    const content = contentCollection ? tweetBuilder(contentCollection) : tweetBuilder(tweet.text);

    try {
      const reply = await this.api.post('statuses/update', {in_reply_to_status_id: tweetId, status: `${content} @${username}`});
      console.log(`Stream bot: ${reply.data.text}`);
    } catch (err) {
      console.log(`Error occurred:  ${err.stack}`);
    }
  }

  getRandomAnswer(collection) {
    return collection[Math.floor(Math.random()*collection.length)];
  }

  alphabetizeTweet(tweet) {
    return tweet.toLowerCase().split(" ").sort().join(" ");
  }
}

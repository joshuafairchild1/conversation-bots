const apiKeys = require('./.env').apiKeys;
const Twit = require('twit');
const userIds = require('./.env').userIds;
const answers = require('./answers.json');

class Bot {
  constructor() {
    this.api = new Twit(apiKeys);
  }

  watchUserTweets(usersArray, replyType) {
    const users = usersArray.join()
    const stream = this.api.stream('statuses/filter', {follow: users})
      .on('tweet', tweet => {
        if (replyType === 'answer') {
          const tweetId = tweet.id_str;
          const username = tweet.user.screen_name;
          const answer = this.getRandomAnswer(answers);
          this.api.post('statuses/update', {in_reply_to_status_id: tweetId, status: `${answer} @${username}`})
            .then(console.log(`Successful reply: ${answer}`))
            .catch(error => console.log(error.stack));
        }

        else if (replyType === 'alphabetize') {
          const tweetId = tweet.id_str;
          const username = tweet.user.screen_name;
          const content = this.alphabetizeTweet(tweet.text);
          this.api.post('statuses/update', {in_reply_to_status_id: tweetId, status: `${content}. There, I alphabetized it for you! @${username}`})
            .then(console.log(`Successful tweet: ${content}`))
            .catch(error => console.log(error.stack));
        }
      })
      .on('error', error => console.log(error.stack));
  }


  getRandomAnswer(collection) {
    return collection[Math.floor(Math.random()*((collection.length-1)-0+1)+0)];
  }

  alphabetizeTweet(tweet) {
    return tweet.toLowerCase().split(" ").sort().join(" ");
  }
}


//node execution area
const bot = new Bot();

bot.watchUserTweets([userIds.content_bot1000, userIds.EpicodusStudent], 'answer');
// bot.watchUserTweets([userIds.content_bot1000, userIds.EpicodusStudent], 'alphabetize');

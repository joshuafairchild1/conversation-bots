const ContentBot = require('./bots/content-bot.js');
const StreamBot = require('./bots/stream-bot.js');
const questions = require('./assets/questions.json');
const proverbs = require('./assets/proverbs.json');
const userIds = require('./.env').userIds;
const tweetRate = 1000*3;
const contentBot = new ContentBot();
const streamBot = new StreamBot();


// bot.postTweet(proverbs);
// bot.postTweet(questions);

// setInterval(() => contentBot.postTweet(proverbs), tweetRate);
setInterval(() => contentBot.postTweet(questions), tweetRate);


// streamBot.watchUserTweets([userIds.content_bot1000], 'answer');
streamBot.watchUserTweets([userIds.content_bot1000], 'alphabetize');

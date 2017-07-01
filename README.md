## Conversation Bots

###### Demonstration of making API requests with JavaScript

##### By **Joshua Fairchild and Jordan Loop, June 29, 2017**

## Description

This repository contains two twitter bots created using the [twit](https://github.com/ttezel/twit) JavaScript library, accessing Twitter's [Search](https://dev.twitter.com/rest/public/search) and [Stream](https://dev.twitter.com/streaming/overview) APIs. content-bot is set on a timer to tweet generated content every 60 seconds, while stream-bot is "watching" for the content-bot to tweet. When the content-bot tweets, stream-bot will reply to content-bot.

content-bot can generate two types of tweets, questions and proverbs. Both types of tweets are created by taking two sentences of the same type (question or proverb) and smushing them together. Examples:

  * The squeaky wheel catches the worms
  * Honesty is without breaking a few eggs
  * How could wolf populations be like your eggs cooked?

stream-bot has two types of replies: either a random answer, or the content of original tweet, alphabetized. Example:

* catches the the squeaky wheel worms

Twitter users may be added to stream-bot's watch by including their information in your `.env` file and adding them to the array of users being passed into the `Bot.watchUserTweets()` method call.

[Be sure to abide by Twitter's rules pertaining to automation](https://support.twitter.com/articles/76915)

## Installation Requirements

* You must install or have installed:

  * [Node and npm](https://nodejs.org/en/)

## Setup/

* Clone this repository

  `git clone https://github.com/joshuafairchild1/conversation_bots`


* Navigate into each `-bot` folder and run `npm install` to install dependencies

* In the root directory of each `-bot` folder, create a file named `.env`, this is where your API keys will be stored. **Be sure to add this to your .gitignore file to keep your API keys private**. Instructions for obtaining your Twitter API keys can be found [here](https://dev.twitter.com/oauth/overview/application-owner-access-tokens). Note that each bot will require it's own set of API keys.

* Add the following code to each `.env` file:

  ```
  exports.apiKeys = {
    consumer_key: "YOUR_API_KEY_HERE",
    consumer_secret: "YOUR_API_KEY_HERE",
    access_token: "YOUR_API_KEY_HERE",
    access_token_secret: "YOUR_API_KEY_HERE"
  }  
  ```

* Add the following to code to the `.env` file in the `stream-bot` directory:

  ```
  exports.userIds = {
    username: "XXXXXXXXXXXXX"
  }
  ```

  This is where you will store the username and id of the Twitter accounts that you would like the stream-bot to watch (do not include the @ sign in the username).

* In two terminal tabs/windows, navigate to each `-bot` file (one terminal in `content-bot`, the other in `stream-bot`) and run `node bot.js` in each to begin running the applications.


## Technologies Used

* JavaScript
* [twit](https://github.com/ttezel/twit)
* Twitter [Search](https://dev.twitter.com/rest/public/search) and [Stream](https://dev.twitter.com/streaming/overview) APIs
* [Node/npm](https://nodejs.org/en/)


## License

This project is licensed under the MIT License

**_Joshua Fairchild_** Copyright (c) 2017

/*
#   (｡◕‿‿◕｡)   -------  Imports and Vars Start ------- (づ｡◕‿‿◕｡)づ
*/
// Discord API Key
require("dotenv").config();
const { Client } = require("discord.js");
const axios = require("axios");
const bot = new Client();
const prefix = "!";
// Reddit URI
const redditURL = "http://www.reddit.com/r/";
let subreddit = "Pizza";
let postLimit = 500;

//json?&limit=500`
let urls = [];
/* 
# (づ｡◕‿‿◕｡)づ -------  Imports and Vars End ------- (｡◕‿‿◕｡)
*/
/*
@  (｡◕‿‿◕｡)   -------  Functional Start ------- (づ｡◕‿‿◕｡)づ
*/
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
// compose URI to fetch images
const composeURI = (redditURL, subreddit, postLimit) => {
  const JSONquery = `/.json?&limit=${postLimit}`;
  return redditURL + subreddit + JSONquery;
};
// fetch JSON from Reddit
const fetchData = async () => {
  await axios(composeURI(redditURL, subreddit, postLimit))
    .then((data) => {
      console.log("Data Fetched");
      getImages(data);
    })
    .catch((err) => console.log(err));
};
// get images from JSON response
const getImages = async (postData) => {
  let imgs = [];
  postData.data.data.children
    .map((data) => data.data)
    .forEach((img) => {
      if (img.url.includes(`https://i.redd.it/`)) {
        imgs.push(img.url);
      }
    });
  urls = imgs;
};
// image urls
fetchData();
/* 
@ (づ｡◕‿‿◕｡)づ -------  Functional End ------- (｡◕‿‿◕｡)
*/

/*
#   (｡◕‿‿◕｡)   -------  Discord Interface Start ------- (づ｡◕‿‿◕｡)づ
*/
// on reviving a bot command
bot.on("message", (msg) => {
  // must begin with !
  if (!msg.content.startsWith(prefix)) return;
  // full array of the command
  const args = msg.content.trim().split(/ +/g);
  // command to be executed
  const cmd = args[0].slice(prefix.length).toLowerCase();
  // command tree
  if (cmd === "concept") {
    msg.channel.send(urls[getRndInteger(0, urls.length)]);
  } else if (cmd === "set" && args.length == 2) {
    subreddit = args[1];
    fetchData();
    msg.channel.send(
      `subreddit is being set to ${subreddit} please wait..., Hopefully you didn't misspell your existance`
    );
  }
});

bot.login(process.env.TOKEN);

/* 
# (づ｡◕‿‿◕｡)づ -------  Discord Interface End ------- (｡◕‿‿◕｡)
*/

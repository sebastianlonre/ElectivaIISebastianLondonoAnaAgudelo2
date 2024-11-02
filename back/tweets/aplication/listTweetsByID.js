const { findUser } = require('../../users/infraestructure/userAdapters');
const Tweet = require('../domain/tweetsModel');

const tweetCache = new Map(); 

const listTweetsByID = async (userTag) => {
  if (!userTag) {
    return { message_error: "User tag is required" };
  }

  if (tweetCache.has(userTag)) {
    return { message: "Tweets retrieved from cache", tweets: tweetCache.get(userTag) };
  }

  try {
    let { message_error, user } = await findUser(userTag);

    if (message_error) {
      return { menssage_error: message_error };
    }

    const tweets = await Tweet.find({ _id: { $in: user.tweets } });

    tweetCache.set(userTag, tweets);
    return { message: "Tweets retrieved successfully", tweets };
  } catch (error) {
    return { message_error: "Failed to list tweets of the user" + error };
  }
};

module.exports = {
  listTweetsByID,
};

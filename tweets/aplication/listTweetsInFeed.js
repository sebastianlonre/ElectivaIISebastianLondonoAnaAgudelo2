const { getFollowings } = require('../../users/infraestructure/userAdapters');
const Tweet = require('../domain/tweetsModel');
const { listTweetsByID } = require('./listTweetsByID');

const listTweetsInFeed = async (userTag) => {

  let tweetsInFeed;

  if (!userTag) {
    tweetsInFeed = await Tweet.find().sort({ createTweetAt: -1 });
    return { message: "Tweet return successfully for not user login", tweetsInFeed };
  }

  try {

    let userActiveTweets = await listTweetsByID(userTag);

    if (userActiveTweets.menssage_error) {
      return { menssage_error: userActiveTweets.menssage_error }
    }

    let followings = await getFollowings(userTag);

    console.log(followings);

    return { message: "Tweets retrieved successfully", userActiveTweets };
  } catch (error) {
    return { menssage_error: "Failed to search tweets" + error };
  }
}

module.exports = {
  listTweetsInFeed
}
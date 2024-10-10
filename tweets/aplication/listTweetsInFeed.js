const { getFollowings } = require('../../users/infraestructure/userAdapters');
const Tweet = require('../domain/tweetsModel');
const { listTweetsByID } = require('./listTweetsByID');

const listTweetsInFeed = async (userTag) => {

  let tweetsInFeed= [];

  if (!userTag) {
    tweetsInFeed = await Tweet.find().sort({ createTweetAt: -1 });
    return { message: "Tweet return successfully for not user login", tweetsInFeed };
  }

  try {

    let userActiveTweets = await listTweetsByID(userTag);
    let followingsTweets = [];

    if (userActiveTweets.menssage_error) {
      return { menssage_error: userActiveTweets.menssage_error }
    }

    const followings = await getFollowings(userTag);

    if (followings.message_error) {

      console.error("Error:", followings.message_error);

    } else {

      for (const tag of followings.followingTags) {

        const tweets = await listTweetsByID(tag);

        if (tweets.message_error) {
          return { menssage_error: tweets.message_error }
        }

        followingsTweets.push(...tweets.tweets);
      }
    }

    tweetsInFeed = [...userActiveTweets.tweets, ...followingsTweets];

    tweetsInFeed.sort((a, b) => new Date(b.createTweetAt) - new Date(a.createTweetAt));

    return { message: "Tweets retrieved successfully", tweetsInFeed };
  } catch (error) {
    return { menssage_error: "Failed to search tweets" + error };
  }
}

module.exports = {
  listTweetsInFeed
}
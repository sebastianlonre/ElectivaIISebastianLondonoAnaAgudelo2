const { getFollowings } = require('../../users/infraestructure/userAdapters');
const Tweet = require('../domain/tweetsModel');
const { listTweetsByID } = require('./listTweetsByID');

const feedCache = new Map(); 

const listTweetsInFeed = async (userTag) => {
  let tweetsInFeed = [];

  if (!userTag) {
    tweetsInFeed = await Tweet.find().sort({ createTweetAt: -1 });
    return { message: "Tweet returned successfully for non-logged user", tweetsInFeed };
  }

  if (feedCache.has(userTag)) {
    return { message: "Tweets retrieved from cache", tweetsInFeed: feedCache.get(userTag) };
  }

  try {
    let userActiveTweets = await listTweetsByID(userTag);
    let followingsTweets = [];

    if (userActiveTweets.message_error) {
      return { message_error: userActiveTweets.message_error };
    }

    const followings = await getFollowings(userTag);

    if (followings.message_error === 'No followings found for this user') {
      tweetsInFeed = await Tweet.find().sort({ createTweetAt: -1 });
      return { message: "Tweet returned successfully for non-logged user", tweetsInFeed };
    }

    if (followings.message_error) {
      return { message_error: followings.message_error };
    } else {
      for (const tag of followings.followingTags) {
        const tweets = await listTweetsByID(tag);

        if (tweets.message_error) {
          return { message_error: tweets.message_error };
        }

        followingsTweets.push(...tweets.tweets);
      }
    }

    tweetsInFeed = [...userActiveTweets.tweets, ...followingsTweets];
    tweetsInFeed.sort((a, b) => new Date(b.createTweetAt) - new Date(a.createTweetAt));

    feedCache.set(userTag, tweetsInFeed);
    return { message: "Tweets retrieved successfully", tweetsInFeed };
  } catch (error) {
    return { message_error: "Failed to search tweets: " + error };
  }
};

module.exports = {
  listTweetsInFeed,
};

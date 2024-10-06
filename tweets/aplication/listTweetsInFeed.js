const User = require('../../users/domain/userModel');
const Tweet = require('../domain/tweetsModel');
const { listTweetsByID } = require('./listTweetsByID');

const listTweetsInFeed = async ( userTag ) => {

  let tweetsInFeed;

  if(!userTag){
    tweetsInFeed = await Tweet.find().sort({ createTweetAt: -1 });
    return { message: "Tweet return successfully for not user login", tweetsInFeed };
  }

  try {

    let user = await User.findOne({ userTag });
    let userActiveTweets = await listTweetsByID(userTag);


    return { message: "Tweets retrieved successfully", userActiveTweets};
  } catch (error) {
    return { message_error: "Failed to search tweets", error };
  }
}

module.exports = {
  listTweetsInFeed
}
const User = require('../../users/domain/userModel');
const Tweet = require('../domain/tweetsModel');
const { validationTweetStructure } = require('../domain/tweetsValidators');

const newTweets = async (tweetData) => {
  const { userName, userTag, content } = tweetData;

  const { validation, message } = validationTweetStructure(content);

  if (!validation) {
    return { menssage_error: message };
  }

  try {
    let user = await User.findOne({ userTag });

    if (!user) {
      return { menssage_error: "[ERROR] Failed to create tweet in database"};
    }

    const newTweet = new Tweet({
      userName,
      userTag,
      content,
    });

    await newTweet.save();

    user.tweets.push(newTweet._id);
    await user.save();

    return { menssage: "[INFO] Tweet created successfully", tweet: newTweet };
  } catch (error) {
    return { menssage_error: "[ERROR] Failed to create tweet in database", error };
  }
};

module.exports = {
  newTweets
};

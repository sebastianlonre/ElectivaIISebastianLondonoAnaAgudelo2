const User = require('../../users/adapters/userModel');
const Tweet = require('../adapters/tweetsModel');
const { validationTweetStructure } = require('../domain/tweetsValidators');

const newTweets = async (tweetData) => {
  const { userName, userTag, content } = tweetData;

  const { validation, menssage } = validationTweetStructure(content);
  if (!validation) {
    return { menssage_error: "[ERROR] " + menssage };
  }

  try {
    //solo esta para probar, se debe cambiar cuando creemos usuarios
    let user = await User.findOne({ userTag });

    if (!user) {
      user = new User({
        userName,
        userLastName: "Default",
        userTag,
        email: "default@example.com",
        password: "123456"
      });
      await user.save();
    }

    //

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

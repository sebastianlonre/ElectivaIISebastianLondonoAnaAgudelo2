const User = require('../../users/domain/userModel');
const Tweet = require('../domain/tweetsModel');

const listTweetsByID = async (userTag) => {
  if (!userTag) {
    return { message_error: "User tag is required" };
  }

  try {

    let user = await User.findOne({ userTag });

    if (!user) {
      return { message_error: "[ERROR] User not found" };
    }

    const tweets = await Tweet.find({ _id: { $in: user.tweets } });

    return { message: "[INFO] Tweets retrieved successfully", tweets };
  } catch (error) {
    return { message_error: "[ERROR] Failed to list tweets of the user", error };
  }
};

module.exports = {
  listTweetsByID
};

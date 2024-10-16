const { Followers, Followings } = require("../../social/domain/socialModel");
const Tweet = require("../../tweets/domain/tweetsModel");
const User = require("../domain/userModel");

const findUserByTag = async (userTag) => {

  if (!userTag) {
    return {
      message_error: "User tag is required"
    };
  }

  try {
    let user = await User.findOne({ userTag });

    if (!user) {
      return {
        message_error: "User not found"
      };
    }

    const tweets = await Tweet.find({ _id: { $in: user.tweets } });
    let followers = await Followers.find({ _id: { $in: user.followers } });
    const followings = await Followings.find({ _id: { $in: user.followings } });

    return {
      message: "User returned successfully",
      user,
      tweets,
      followers,
      followings
    };

  } catch (error) {
    return { message_error: "Failed to search user by tag: " + error }
  }
}

module.exports = {
  findUserByTag
}

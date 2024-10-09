const User = require('../../users/domain/userModel');
const Tweet = require('../domain/tweetsModel');
const findUser = require('../../users/infraestructure/userAdapters');

const listTweetsByID = async (userTag) => {

  if (!userTag) {
    return { message_error: "User tag is required" };
  }

  try {

    let { message_error, user } = await findUser(userTag);

    if (message_error) {
      return { menssage_error: message_error };
    };

    const tweets = await Tweet.find({ _id: { $in: user.tweets } });

    return { message: "Tweets retrieved successfully", tweets };
  } catch (error) {
    return { message_error: "Failed to list tweets of the user", error };
  }
};

module.exports = {
  listTweetsByID
};

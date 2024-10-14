const User = require("../domain/userModel")

const findUserByTag = async (userTag) => {

  if (!userTag) {
    return {
      message_error: "User tag is require"
    };
  }

  try {

    let user = await User.findOne({ userTag });

    if (!user) {
      return {
        message_error: "User not found"
      };
    }

    return {
      message: "User return succesful",
      user
    };

  } catch (error) {
    return { message_error: "Fail to search user by tag: " + error }
  }
}

module.exports = {
  findUserByTag
}
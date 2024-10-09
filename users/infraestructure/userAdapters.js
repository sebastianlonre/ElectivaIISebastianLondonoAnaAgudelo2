const { findUserByTag } = require("../aplication/findUserByTag");
const { getFollowingsByTag } = require("../aplication/getFollowingsByTag");

const findUser = async (userTag) => {
  try {
    const { message_error, user } = await findUserByTag(userTag);

    if (message_error) {
      return { message_error };
    }

    return { user };
  } catch (error) {
    return { message_error: "Error occurred: " + error };
  }
}

const getFollowings = async (userTag) => {

  try {
    const { message_error, followings } = await getFollowingsByTag(userTag);

    if (message_error) {
      return { message_error };
    }

    return { followings };
  } catch (error) {
    return { message_error: "Error occurred: " + error };
  }

}

module.exports = {
  findUser,
  getFollowings
};

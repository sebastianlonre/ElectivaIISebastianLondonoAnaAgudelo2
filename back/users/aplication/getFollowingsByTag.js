const { Followings } = require("../../social/domain/socialModel");
const { findUserByTag } = require("./findUserByTag");

const getFollowingsByTag = async (userTag) => {

  try {

    let user = await findUserByTag(userTag);

    if (user.message_error) {
      return { menssage_error: user.message_error }
    }

    const followings = await Followings.find({ _id: { $in: user.user.followings } });

    if (!followings || followings.length === 0) {
      return { menssage_error: "No followings found for this user" };
    }

    const followingTags = followings.map(following => following.followingTag);

    return { menssage: "followings retrived succesfull" ,followingTags };

  } catch (error) {
    return { menssage_error: "Error with get followings" + error };
  };

};

module.exports = {
  getFollowingsByTag
};
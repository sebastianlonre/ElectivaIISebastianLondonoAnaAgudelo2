const { Followings } = require("../domain/socialModel");

const checkIfAlreadyFollowing = async (userTag, userToFollowTag) => {
  try {
    const following = await Followings.findOne({
      userTag: userTag,
      followingTag: userToFollowTag,
    });

    return following !== null;
  } catch (error) {
    return { menssage_error: "Error checking follow status: " + error };
  }
};

module.exports = { checkIfAlreadyFollowing };

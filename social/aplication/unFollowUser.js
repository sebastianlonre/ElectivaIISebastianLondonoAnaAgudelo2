const findUser = require("../../users/infraestructure/userAdapters");
const { Followings, Followers } = require("../domain/socialModel");
const { socialValidator } = require("../domain/socialValidator");
const { checkIfAlreadyFollowing } = require("./checkFollowing");

const unFollowUser = async (userTag, userToUnfollowTag) => {
  const { validation, menssage } = socialValidator(userTag, userToUnfollowTag);
  if (!validation) {
    return { menssage_error: menssage };
  }

  try {
    const { message_error: messageErrorUser, user } = await findUser(userTag);
    if (messageErrorUser) {
      return { menssage_error: messageErrorUser };
    }

    const { message_error: messageErrorUserToUnfollow, user: userToUnfollow } = await findUser(userToUnfollowTag);
    if (messageErrorUserToUnfollow) {
      return { menssage_error: messageErrorUserToUnfollow };
    }

    const isAlreadyFollowing = await checkIfAlreadyFollowing(userTag, userToUnfollowTag);
    if (!isAlreadyFollowing) {
      return { menssage_error: `User ${userTag} does not follow ${userToUnfollowTag}` };
    }

    await Followings.findOneAndDelete({
      userTag: userTag,
      followingTag: userToUnfollowTag,
    });

    await Followers.findOneAndDelete({
      userTag: userToUnfollowTag,
      followerTag: userTag,
    });

    user.followings = user.followings.filter(following => following.toString() == userToUnfollowTag);
    userToUnfollow.followers = userToUnfollow.followers.filter(follower => follower.toString() == userTag);

    await user.save();
    await userToUnfollow.save();

    return { menssage: `User ${userTag} has unfollowed ${userToUnfollowTag}` };

  } catch (error) {
    return { menssage_error: "Failed to unfollow user: " + error.message };
  }
};

module.exports = {
  unFollowUser
};

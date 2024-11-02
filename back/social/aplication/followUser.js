const { findUser } = require("../../users/infraestructure/userAdapters");
const { Followings, Followers } = require("../domain/socialModel");
const { socialValidator } = require("../domain/socialValidator");
const { checkIfAlreadyFollowing } = require("./checkFollowing");

const userCache = new Map();

const followUser = async (userTag, userToFollowTag) => {
  const { validation, menssage } = socialValidator(userTag, userToFollowTag);

  if (!validation) {
    return { menssage_error: menssage };
  }

  try {
    let user = userCache.get(userTag);
    if (!user) {
      const { message_error: messageErrorUser, user: dbUser } = await findUser(userTag);
      if (messageErrorUser) {
        return { menssage_error: messageErrorUser };
      }
      user = dbUser;
      userCache.set(userTag, user);
    }

    let userToFollow = userCache.get(userToFollowTag);
    if (!userToFollow) {
      const { message_error: messageErrorUserToFollow, user: dbUserToFollow } = await findUser(userToFollowTag);
      if (messageErrorUserToFollow) {
        return { menssage_error: messageErrorUserToFollow };
      }
      userToFollow = dbUserToFollow;
      userCache.set(userToFollowTag, userToFollow); 
    }

    const isAlreadyFollowing = await checkIfAlreadyFollowing(userTag, userToFollowTag);
    if (isAlreadyFollowing) {
      return { menssage_error: `User ${userTag} already follows ${userToFollowTag}` };
    }

    const newFollowing = new Followings({ userTag, followingTag: userToFollowTag });
    const newFollower = new Followers({ userTag: userToFollowTag, followerTag: userTag });

    await newFollowing.save();
    await newFollower.save();

    user.followings.push(newFollowing._id);
    userToFollow.followers.push(newFollower._id);

    await user.save();
    await userToFollow.save();

    return { menssage: `The user ${userTag} now follows ${userToFollowTag}` };
  } catch (error) {
    return { menssage_error: "Failed to follow user: " + error.message };
  }
};

module.exports = {
  followUser
};

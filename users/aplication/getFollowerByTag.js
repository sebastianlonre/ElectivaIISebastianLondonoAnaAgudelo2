const { findUserByTag } = require("./findUserByTag");


const getFollowerByTag = async (userTag) => {

  try {

    let user = await findUserByTag(userTag);

    if (user.message_error) {
      return { menssage_error: user.message_error }
    }

    let followers = user.user.followers;

    if (!followers || followers.length === 0) {
      return { menssage_error: "No followers found for this user" };
    }

    return { menssage: "followers retrived succesfull", followers };


  } catch (error) {
    return { menssage_error: "Error with get followers" + error };
  };

};

module.exports = {
  getFollowerByTag
};
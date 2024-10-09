const findUser = require("../infraestructure/userAdapters")

const getFollowingsByTag = async (userTag) => {

  try {

    let user = await findUser(userTag);

    if (user.message_error) {
      return { menssage_error: user.message_error }
    }

    let followings = user.user.followings;

    if (!followings || followings.length === 0) {
      return { menssage_error: "No followings found for this user" };
    }

    return { menssage: "followings retrived succesfull", followings };


  } catch (error) {
    return { menssage_error: "Error with get followings" + error };
  };

};

module.exports = {
  getFollowingsByTag
};
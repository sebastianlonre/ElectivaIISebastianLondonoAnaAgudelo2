const { findUserByTag } = require("../aplication/findUserByTag");
const { getFollowerByTag } = require("../aplication/getFollowerByTag");
const { getFollowingsByTag } = require("../aplication/getFollowingsByTag");

const findUsersByTag = async (request, response) => {

  const { userTag } = request.params;

  try {

    const resultUser = await findUserByTag(userTag);

    if (resultUser.message_error) {
      return response.status(400).json(resultUser);
    }

    return response.status(200).json(resultUser);

  } catch (error) {
    return response.status(500).json({ menssage_error: "[ERROR] Unexpected server error: " + error });
  }

}

const getFollowers = async (request, response) => {

  const { userTag } = request.params;

  try {

    const resultFollowers = await getFollowerByTag(userTag);

    if (resultFollowers.menssage_error) {
      return response.status(400).json(resultFollowers);
    }

    return response.status(200).json(resultFollowers);

  } catch (error) {
    return response.status(500).json({ menssage_error: "[ERROR] Unexpected server error: " + error });
  }

}

const getFollwings = async (request, response) => {

  const { userTag } = request.params;


  try {

    const resultFollowings = await getFollowingsByTag(userTag);

    if (resultFollowings.menssage_error) {
      return response.status(400).json(resultFollowings);
    }

    return response.status(200).json(resultFollowings);

  } catch (error) {
    return response.status(500).json({ menssage_error: "[ERROR] Unexpected server error: " + error });
  }

}


module.exports = {
  findUsersByTag,
  getFollowers,
  getFollwings
}
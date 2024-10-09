const { followUser } = require("../aplication/followUser");
const { unFollowUser } = require("../aplication/unFollowUser");

const followUsers = async (request, response) => {
  const { userTag, userToFollowTag } = request.body;

  try {
    const result = await followUser(userTag, userToFollowTag);

    if (result.menssage_error) {
      return response.status(400).json(result);
    }

    return response.status(201).json(result);
  } catch (error) {
    return response.status(500).json({ menssage_error: "[ERROR] Unexpected server error: " + error });
  }
};

const unfollowUsers = async (request, response) => {
  const { userTag, userToUnfollowTag } = request.body;

  try {
    const result = await unFollowUser(userTag, userToUnfollowTag);

    if (result.menssage_error) {
      return response.status(400).json(result);
    }

    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({ menssage_error: "[ERROR] Unexpected server error: " + error });
  }
}

module.exports = {
  followUsers,
  unfollowUsers
}

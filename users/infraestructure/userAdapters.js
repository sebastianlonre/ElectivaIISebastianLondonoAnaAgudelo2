const { findUserByTag } = require("../aplication/findUserByTag");

const findUser = async ( userTag ) => {
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

module.exports = findUser;

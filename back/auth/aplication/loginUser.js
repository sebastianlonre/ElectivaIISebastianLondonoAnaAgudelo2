const User = require("../../users/domain/userModel");
const { validateDataForLogin } = require("./validateDataForLogin");
const { generateToken } = require("./generateJWT");
const { findUser } = require("../../users/infraestructure/userAdapters");

const loginUser = async (userData) => {
  const { userTag, password } = userData;

  const validationResult = validateDataForLogin(userData);
  if (validationResult) {
    return { message_error: validationResult.menssage_error };
  }

  try {

    let user = await findUser(userTag);

    if (!user) {
      return { message_error: "[ERROR] The user does not exist" };
    }
    console.log(user)

    if (password !== user.user.password) {
      return { message_error: "[ERROR] Incorrect password" };
    }

    const token = generateToken({ userData });
    const userName = user.user.userName;
    const userLastName = user.user.userLastName;

    const userInfo = {
      userName,
      userLastName,
      token
    }

    return { message: "[INFO] Login successful", userInfo };

  } catch (error) {
    return { message_error: "[ERROR] Login failed: " + error };
  }
};

module.exports = { loginUser };

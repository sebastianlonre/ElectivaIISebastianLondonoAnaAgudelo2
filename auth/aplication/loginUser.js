const User = require("../../users/domain/userModel");
const { validateDataForLogin } = require("./validateDataForLogin");
const { generateToken } = require("./generateJWT");

const loginUser = async (userData) => {
  const { userTag, password } = userData;

  const validationResult = validateDataForLogin(userData);
  if (validationResult) {
    return { message_error: validationResult.menssage_error };
  }

  try {

    let user = await User.findOne({ userTag });

    if (!user) {
      return { message_error: "[ERROR] The user does not exist" };
    }

    if (password !== user.password) {
      return { message_error: "[ERROR] Incorrect password" };
    }

    const token = generateToken({ userData });
    return { message: "[INFO] Login successful", token };

  } catch (error) {
    return { message_error: "[ERROR] Login failed: " + error };
  }
};

module.exports = { loginUser };

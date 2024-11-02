const User = require("../../users/domain/userModel");
const { validateDataForLogin } = require("./validateDataForLogin");
const { generateToken } = require("./generateJWT");
const { findUser } = require("../../users/infraestructure/userAdapters");
const userCache = new Map();

const loginUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    const { userTag, password } = userData;

    const validationResult = validateDataForLogin(userData);
    if (validationResult) {
      return resolve({ message_error: validationResult.message_error });
    }

    try {
      let user = userCache.get(userTag);
      if (!user) {
        user = await findUser(userTag);

        if (!user) {
          return resolve({ message_error: "[ERROR] The user does not exist" });
        }

        userCache.set(userTag, user);
      }

      if (password !== user.password) {
        return resolve({ message_error: "[ERROR] Incorrect password" });
      }

      const token = generateToken({ userData });
      const { userName, userLastName } = user;

      return resolve({
        message: "[INFO] Login successful",
        userInfo: { userName, userLastName, token },
      });
    } catch (error) {
      return reject({ message_error: "[ERROR] Login failed: " + error });
    }
  });
};

module.exports = { loginUser };

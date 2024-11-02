const User = require("../../users/domain/userModel");
const { validateDataForRegister } = require("./validateDataForRegister");
const { generateToken } = require("./generateJWT");
const userCache = new Map();

const registerUser = (userData) => {
  return new Promise(async (resolve, reject) => {
    const { userName, userLastName, userTag, email, password } = userData;

    const validationResult = validateDataForRegister(userData);

    if (validationResult) {
      return resolve({ message_error: validationResult.menssage_error });
    }

    try {
      const tag = "@" + userTag;

      let user = await User.findOne({ userTag: tag });

      if (user) {
        userCache.set(tag, user);
        return resolve({ message_error: "[ERROR] The user already exists in the database" });
      }

      const newUser = new User({
        userName,
        userLastName,
        userTag: tag,
        email,
        password
      });

      await newUser.save();

      userCache.set(tag, newUser);

      const token = generateToken({ userData });
      return resolve({ message: "[INFO] User registered successfully", token });

    } catch (error) {
      return reject({ message_error: "[ERROR] To register user: " + error });
    }
  });
};

module.exports = registerUser;

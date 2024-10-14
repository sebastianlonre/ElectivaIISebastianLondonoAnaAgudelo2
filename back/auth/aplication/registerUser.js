const User = require("../../users/domain/userModel");
const { validateDataForRegister } = require("./validateDataForRegister");
const { generateToken } = require("./generateJWT");



const registerUser = async (userData) => {

  const { userName, userLastName, userTag, email, password } = userData;

  const validationResult = validateDataForRegister(userData);

  if (validationResult) {
    return { message_error: validationResult.menssage_error };
  }

  try {
    const tag = "@"+ userTag

    let user = await User.findOne({ userTag: tag });

    if (user) {
      return { message_error: "[ERROR] the user already exists" };
    }

    const newUserTag = "@"+userTag;

    user = new User({
      userName,
      userLastName,
      userTag: newUserTag,
      email,
      password
    })

    await user.save();

    const token = generateToken({ userData});
    return { message: "[INFO] User registered successfully", token };

  } catch (error) {
    return { message_error: "[ERROR] to register user: " + error };
  }
};

module.exports = registerUser;
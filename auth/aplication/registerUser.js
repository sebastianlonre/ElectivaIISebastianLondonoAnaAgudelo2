const User = require("../../users/domain/userModel");
const { validateDataForRegister } = require("./validateDataForRegister");


const registerUser = async (userData) => {

  const { userName, userLastName, userTag, email, password } = userData;

  const validationResult = validateDataForRegister(userData);

  if (validationResult) {
    return { message_error: validationResult.menssage_error };
  }

  try {

    let user = await User.findOne({ userTag });

    if (user) {
      return { message_error: "[ERROR] the user already exists" };
    }

    user = new User({
      userName,
      userLastName,
      userTag,
      email,
      password
    })

    await user.save();

    return { message: "[INFO] User registered successfully" };

  } catch (error) {
    return { message_error: "[ERROR] to register user: " + error };
  }
};

module.exports = registerUser;
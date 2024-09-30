const { emailValidator } = require("../domain/emailValidator");
const { passwordValidator } = require("../domain/passwordValidator");
const { registerValidator } = require("../domain/registerValidator");


const registerUser = async (userData) => {

  const { email, password } = userData;

  const { passwordValidation, passwordMessage } = passwordValidator(password);
  const { registerValidation, registerMessage } = registerValidator(userData);
  const { emailValidation, emailMessage } = emailValidator(email);

  if (!passwordValidation) {
    return { menssage_error: passwordMessage};
  };

  if (!registerValidation) {
    return { menssage_error: registerMessage};
  };

  if (! emailValidation) {
    return { menssage_error: emailMessage};
  };

  return { message: "User registered successfully" };
};

module.exports = registerUser;
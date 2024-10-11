const { userTagValidator } = require("../domain/userTagValidator");
const { passwordValidator } = require("../domain/passwordValidator");
const { loginValidator } = require("../domain/loginValidator");

const validateDataForLogin = (userData) => {

  const { userTag, password } = userData;
  const { passwordValidation, passwordMessage } = passwordValidator(password);
  const { loginValidation, loginMessage } = loginValidator(userData);
  const { userTagValidation, userTagMessage } = userTagValidator(userTag);

  if (!passwordValidation) {
    return { menssage_error: passwordMessage };
  }

  if (!loginValidation) {
    return { menssage_error: loginMessage };
  }

  if (!userTagValidation) {
    return { menssage_error: userTagMessage };
  }

};

module.exports = {
  validateDataForLogin
};

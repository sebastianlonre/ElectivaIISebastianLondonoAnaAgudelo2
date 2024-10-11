const loginValidator = (userData) => {
  let loginValidation = true;
  let loginMessage = "";

  const { userTag, password } = userData; 

  if (!userTag) {
    loginValidation = false;
    loginMessage = "[ERROR] UserTag is required";
    return { loginValidation, loginMessage };
  }

  if (!password) {
    loginValidation = false;
    loginMessage = "[ERROR] Password is required";
    return { loginValidation, loginMessage };
  }

  if (!loginValidation) {
    return { loginValidation, loginMessage };
  }

  return { loginValidation, loginMessage: "[INFO] Login data is valid" };
};

module.exports = { loginValidator };

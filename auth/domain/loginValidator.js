const loginValidator = ({ userData }) => {
  let loginValidation = true;
  let loginMessage = "";

  const { email, password } = userData;

  if (!email) {
    loginValidation = false;
    loginMessage = "[ERROR] Email is required";
  }

  if (!password) {
    loginValidation = false;
    loginMessage = "[ERROR] Password is required";
  }

  return { loginValidation, loginMessage };
};

module.exports = { loginValidator };

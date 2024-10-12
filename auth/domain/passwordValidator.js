const passwordValidator = (password) => {
  let passwordValidation = true;
  let passwordMessage = "";

  if (!password) {
    passwordValidation = false;
    passwordMessage = "[ERROR] password is required";
    return { passwordValidation, passwordMessage };
  }

  if (password.length < 8 || password.length > 30) {
    passwordValidation = false;
    passwordMessage = "[ERROR] password must be between 8 and 30 characters";
    return { passwordValidation, passwordMessage };
  }

  const hasUppercase = /[A-Z]/.test(password);
  if (!hasUppercase) {
    passwordValidation = false;
    passwordMessage = "[ERROR] password must contain at least one uppercase letter";
    return { passwordValidation, passwordMessage };
  }

  const onlyAllowedChars = /^[a-zA-Z0-9._-]+$/.test(password);
  if (!onlyAllowedChars) {
    passwordValidation = false;
    passwordMessage = "[ERROR] password contains invalid characters. Only ., _, and - are allowed.";
    return { passwordValidation, passwordMessage };
  }

  const containSpecialChar = /[._-]/.test(password);
  if (!containSpecialChar) {
    passwordValidation = false;
    passwordMessage = "[ERROR] password must contain at least one of the following characters: ., _, or -";
    return { passwordValidation, passwordMessage };
  }

  const containNumbers =/[0-9]/.test(password)
  if (!containNumbers) {
    passwordValidation = false;
    passwordMessage = "[ERROR] password must contain a number";
    return { passwordValidation, passwordMessage };
  }

  return { passwordValidation, passwordMessage };
};

module.exports = { passwordValidator };

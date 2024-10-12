const emailValidator = (email) => {
  let emailValidation = true;
  let emailMessage = "";

  if (!email) {
    emailValidation = false;
    emailMessage = "[ERROR] email is required";
    return { emailValidation, emailMessage };
  }

  const emailRequireChars = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  if (!emailRequireChars) {
    emailValidation = false;
    emailMessage = "[ERROR] email structure is not valid.";
    return { emailValidation, emailMessage };
  }

  return { emailValidation, emailMessage: "[INFO] Email is valid" };
};

module.exports = { emailValidator };

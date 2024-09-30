const registerValidator = (userData) => {
  let registerValidation = true;
  let registerMessage = "";

  const { userName, userLastName, userTag } = userData;

  // Null validations
  if (!userName) {
    registerValidation = false;
    registerMessage = "[ERROR] user name is required";
    return { registerValidation, registerMessage };
  }

  if (!userLastName) {
    registerValidation = false;
    registerMessage = "[ERROR] user last name is required";
    return { registerValidation, registerMessage };
  }

  if (!userTag) {
    registerValidation = false;
    registerMessage = "[ERROR] user tag is required";
    return { registerValidation, registerMessage };
  }

  //long validations
  if(userName.length < 1 || userName.length > 45){
    registerValidation = false;
    registerMessage = "[ERROR] user name must be between 1 and 45 characters";
    return { registerValidation, registerMessage };
  }

  if(userLastName.length < 1 || userLastName.length > 45){
    registerValidation = false;
    registerMessage = "[ERROR] user last name must be between 1 and 45 characters";
    return { registerValidation, registerMessage };
  }

  if(userTag.length < 5 || userTag.length > 30){
    registerValidation = false;
    registerMessage = "[ERROR] user last name must be between 5 and 30 characters";
    return { registerValidation, registerMessage };
  }

  // Special character validations
  const hasSpecialCharsUserName = /[^a-zA-Z0-9]/.test(userName);
  if (hasSpecialCharsUserName) {
    registerValidation = false;
    registerMessage = "[ERROR] user name must not contain special characters";
    return { registerValidation, registerMessage };
  }

  const hasSpecialCharsLastName = /[^a-zA-Z0-9]/.test(userLastName);
  if (hasSpecialCharsLastName) {
    registerValidation = false;
    registerMessage = "[ERROR] user last name must not contain special characters";
    return { registerValidation, registerMessage };
  }

  const hasInvalidTagChars = /[^a-zA-Z0-9._-]/.test(userTag);
  if (hasInvalidTagChars) {
    registerValidation = false;
    registerMessage = "[ERROR] user tag can only contain letters, numbers, ., _, or -";
    return { registerValidation, registerMessage };
  }

  return { registerValidation, registerMessage: "[INFO] User registration data is valid" };
};

module.exports = { registerValidator };

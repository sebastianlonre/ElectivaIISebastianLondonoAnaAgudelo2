const userTagValidator = (userTag) => {
  let userTagValidation = true;
  let userTagMessage = "";

  if (!userTag) {
    userTagValidation = false;
    userTagMessage = "[ERROR] userTag is required";
    return { userTagValidation, userTagMessage };
  }

  const userTagValidChars = /^[a-zA-Z0-9_]+$/.test(userTag);
  if (!userTagValidChars) {
    userTagValidation = false;
    userTagMessage =
      "[ERROR] userTag must contain only alphanumeric characters or underscores.";
    return { userTagValidation, userTagMessage };
  }

  if (userTag.length < 3 || userTag.length > 15) {
    userTagValidation = false;
    userTagMessage = "[ERROR] userTag must be between 3 and 15 characters.";
    return { userTagValidation, userTagMessage };
  }

  return { userTagValidation, userTagMessage: "[INFO] userTag is valid" };
};

module.exports = { userTagValidator };

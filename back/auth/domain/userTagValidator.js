const userTagValidator = (userTag) => {
  let userTagValidation = true;
  let userTagMessage = "";

  if (!userTag) {
    userTagValidation = false;
    userTagMessage = "[ERROR] userTag is required";
    return { userTagValidation, userTagMessage };
  }

  if (!userTag.includes("@")) {
    userTagValidation = false;
    userTagMessage = "[ERROR] userTag must contain an '@' symbol.";
    return { userTagValidation, userTagMessage };
  }

  const userTagValidChars = /^[a-zA-Z0-9_@]+$/.test(userTag);
  if (!userTagValidChars) {
    userTagValidation = false;
    userTagMessage =
      "[ERROR] userTag must contain only alphanumeric characters, underscores, or '@'.";
    return { userTagValidation, userTagMessage };
  }

  return { userTagValidation, userTagMessage: "[INFO] userTag is valid" };
};

module.exports = { userTagValidator };

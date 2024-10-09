const validationTweetStructure = (content) => {
  let validation = true;
  let message = "";

  if (!content.trim() || content.trim().length < 1) {
    validation = false;
    message = "[ERROR] The tweet content is empty";
    return { validation, message };
  }

  if (content.length < 1 || content.length > 280) {
    validation = false;
    message = "[ERROR] The tweet content must be between 1 and 280 characters";
  }

  return { validation, message };
};

module.exports = {
  validationTweetStructure
};

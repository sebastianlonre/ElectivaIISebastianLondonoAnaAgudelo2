const { newTweets } = require("../aplication/newTweet");

const newTweet = async (request, response) => {
  const { userName, userTag, content } = request.body;

  const tweetData = { userName, userTag, content };

  try {
    const result = await newTweets(tweetData);

    if (result.menssage_error) {
      return response.status(400).json(result);
    }

    return response.status(201).json(result);
  } catch (error) {
    return response.status(500).json({ menssage_error: "[ERROR] Unexpected server error" });
  }
};

module.exports = {
  newTweet
};
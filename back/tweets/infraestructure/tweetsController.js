const { newTweets } = require("../aplication/newTweet");
const { listTweetsByID } = require("../aplication/listTweetsByID");
const { listTweetsInFeed } = require("../aplication/listTweetsInFeed");

const newTweet = async (request, response) => {
  const { content } = request.body;

  const userTag = request.session.user.userTag;
  const userName = request.session.user.userName;

  const tweetData = { userTag, userName, content };

  try {
    const result = await newTweets(tweetData);

    if (result.menssage_error) {
      return response.status(400).json(result);
    }

    return response.status(201).json(result);
  } catch (error) {
    return response.status(500).json({ menssage_error: "[ERROR] Unexpected server error " + error });
  }
};

const listTweetsByIDs = async (request, response) => {
  const { userTag } = request.params;

  try {
    const result = await listTweetsByID(userTag);

    if (result.message_error) {
      return response.status(400).json(result);
    }

    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({ menssage_error: "[ERROR] Unexpected server error " + error });
  }
}

const listTweetsInFeeds = async (request, response) => {

  let userTag = null;

  if (request.session && request.session.user) {
    userTag = request.session.user.userTag;
  }

  try {
    const result = await listTweetsInFeed(userTag);

    if (result.message_error) {
      return response.status(400).json(result);
    }

    return response.status(200).json(result);
  } catch (error) {
    return response.status(500).json({ menssage_error: "[ERROR] Unexpected server error " + error });
  }
};

module.exports = {
  newTweet,
  listTweetsByIDs,
  listTweetsInFeeds
};
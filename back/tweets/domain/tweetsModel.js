const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userTag: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  createTweetAt: { type: Date, default: Date.now }
});

const Tweet = mongoose.model('Tweet', tweetSchema);

module.exports = Tweet;
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  userLastName: { type: String, required: true },
  userTag: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, default: 0 },
  createTweetAt: { type: Date, default: Date.now },
  tweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tweet' }],
  followers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Followers'}],
  followings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Followings'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;
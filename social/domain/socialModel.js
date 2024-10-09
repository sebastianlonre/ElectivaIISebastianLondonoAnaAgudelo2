const mongoose = require('mongoose');

const followerSchema = new mongoose.Schema({
  userTag: { type: String, required: true },
  followerTag: { type: String, required: true },
});

const followingSchema = new mongoose.Schema({
  userTag: { type: String, required: true },
  followingTag: { type: String, required: true },
});

const Followers = mongoose.model('Followers', followerSchema);
const Followings = mongoose.model('Followings', followingSchema);

module.exports = {
  Followers,
  Followings
};

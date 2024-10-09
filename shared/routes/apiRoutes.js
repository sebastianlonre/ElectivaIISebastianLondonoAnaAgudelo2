const express = require("express");
const router = express.Router();
const { newTweet, listTweetsByIDs, listTweetsInFeeds } = require("../../tweets/infraestructure/tweetsController");
const { registerUserItem } = require("../../auth/infraestructure/authController");
const { followUsers } = require("../../social/infraestructure/socialController");
const { unfollowUsers } = require("../../social/infraestructure/socialController");
const { findUsersByTag, getFollowers } = require("../../users/infraestructure/userController");

//tweets
router.post("/tweets", newTweet);
router.get("/tweets/:userTag", listTweetsByIDs);
router.post("/tweets/feed", listTweetsInFeeds)

//Auth
router.post("/auth/register", registerUserItem);

//social
router.put("/social/follow", followUsers)
router.delete("/social/unfollow", unfollowUsers)

//user
router.get("/:userTag", findUsersByTag)
router.get("/:userTag/followers", getFollowers)

module.exports = router;
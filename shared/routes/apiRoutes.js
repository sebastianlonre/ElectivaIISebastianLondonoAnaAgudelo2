const express = require("express");
const router = express.Router();
const { newTweet, listTweetsByIDs } = require("../../tweets/infraestructure/tweetsController");
const { registerUserItem } = require("../../auth/infraestructure/authController");

//tweets
router.post("/tweets", newTweet)
router.get("/tweets/:userTag", listTweetsByIDs)

//Auth
router.post("/auth/register", registerUserItem);

module.exports = router;
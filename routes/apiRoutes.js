const express = require("express");
const router = express.Router();
const { newTweet } = require("../tweets/adapters/tweetsController")

router.post("/tweets", newTweet)

module.exports = router;
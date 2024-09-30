const express = require("express");
const router = express.Router();
const { newTweet } = require("../../tweets/infraestructure/tweetsController");
const { registerUserItem } = require("../../auth/infraestructure/authController");

router.post("/tweets", newTweet)
router.post("/auth/register", registerUserItem);

module.exports = router;
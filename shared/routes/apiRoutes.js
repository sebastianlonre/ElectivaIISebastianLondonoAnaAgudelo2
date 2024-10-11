const express = require("express");
const router = express.Router();
const { newTweet, listTweetsByIDs, listTweetsInFeeds } = require("../../tweets/infraestructure/tweetsController");
const { registerUserItem, loginUserItem, logoutUserItem } = require("../../auth/infraestructure/authController");
const { followUsers } = require("../../social/infraestructure/socialController");
const { unfollowUsers } = require("../../social/infraestructure/socialController");
const { findUsersByTag, getFollowers } = require("../../users/infraestructure/userController");

const checkAuthentication = (req, res, next) => {
    if (req.session.user) {
      next(); 
    } else {
      res.status(401).json({ message_error: "[ERROR] Not authenticated Users currently" });
    }
  };
  
//tweets
router.post("/tweets", newTweet);
router.get("/tweets/:userTag", listTweetsByIDs);
router.post("/tweets/feed", listTweetsInFeeds)

//Auth
router.post("/auth/register", registerUserItem);
router.post('/login', loginUserItem);
router.post('/logout', logoutUserItem);

// Ruta protegida, solo puede acceder si el login es exitoso
router.get('/protected-route', checkAuthentication, (req, res) => {
    res.json({ message: "You are authenticated", user: req.session.user.userTag });
  });
  

//social
router.put("/social/follow", followUsers)
router.delete("/social/unfollow", unfollowUsers)

//user
router.get("/:userTag", findUsersByTag)
router.get("/:userTag/followers", getFollowers)



module.exports = router;
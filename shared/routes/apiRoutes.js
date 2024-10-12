const express = require("express");
const router = express.Router();
const { newTweet, listTweetsByIDs, listTweetsInFeeds } = require("../../tweets/infraestructure/tweetsController");
const { registerUserItem, loginUserItem, logoutUserItem } = require("../../auth/infraestructure/authController");
const { followUsers } = require("../../social/infraestructure/socialController");
const { unfollowUsers } = require("../../social/infraestructure/socialController");
const { findUsersByTag, getFollowers, getFollwings } = require("../../users/infraestructure/userController");

const checkAuthentication = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).json({ message_error: "[ERROR] Not authenticated Users currently" });
    }
};

/**
 * @swagger
 * tags:
 *   name: Tweets
 *   description: Operations related to tweets
 */

/**
 * @swagger
 * /api/tweets:
 *   post:
 *     summary: Create a new tweet
 *     tags: [Tweets]
 *     parameters:
 *       - in: body
 *         name: tweet
 *         description: Tweet object that needs to be created
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *               example: "Niah"
 *             userTag:
 *               type: string
 *               example: "@NiahUwu"
 *             content:
 *               type: string
 *               example: "awua con sabor a awua"
 *     responses:
 *       201:
 *         description: Tweet created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/tweets", newTweet);


/**
 * @swagger
 * /api/tweets/{userTag}:
 *   get:
 *     summary: List tweets by user tag
 *     tags: [Tweets]
 *     parameters:
 *       - name: userTag
 *         in: path
 *         required: true
 *         description: The tag of the user whose tweets to retrieve
 *         schema:
 *           type: string
 *           example: "@NiahUwu"
 *     responses:
 *       200:
 *         description: A list of tweets
 *       404:
 *         description: User not found
 */
router.get("/tweets/:userTag", listTweetsByIDs);

/**
 * @swagger
 * /api/tweets/feed:
 *   post:
 *     summary: List tweets in feeds
 *     tags: [Tweets]
 *     responses:
 *       200:
 *         description: A list of tweets in feeds
 */
router.post("/tweets/feed", listTweetsInFeeds);

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Operations related to user authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/auth/register", registerUserItem);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid credentials
 */
router.post('/login', loginUserItem);

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Log out a user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User logged out successfully
 */
router.post('/logout', logoutUserItem);

/**
 * @swagger
 * /api/protected-route:
 *   get:
 *     summary: Access a protected route
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: You are authenticated
 *       401:
 *         description: Not authenticated
 */
router.get('/protected-route', checkAuthentication, (req, res) => {
    res.json({ message: "You are authenticated", user: req.session.user.userTag });
});

/**
 * @swagger
 * tags:
 *   name: Social
 *   description: Operations related to following users
 */

/**
 * @swagger
 * /api/social/follow:
 *   put:
 *     summary: Follow a user
 *     tags: [Social]
 *     parameters:
 *       - in: body
 *         name: followData
 *         description: Object containing user tags for following
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userTag:
 *               type: string
 *               example: "@NiahUwu"
 *             userToFollowTag:
 *               type: string
 *               example: "@Magdalena"
 *     responses:
 *       200:
 *         description: User followed successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User to follow not found
 */
router.put("/social/follow", followUsers);


/**
 * @swagger
 * /api/social/unFollow:
 *   delete:
 *     summary: unfollow a user
 *     tags: [Social]
 *     parameters:
 *       - in: body
 *         name: followData
 *         description: Object containing user tags for unfollowing
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userTag:
 *               type: string
 *               example: "@NiahUwu"
 *             userToUnfollowTag:
 *               type: string
 *               example: "@Magdalena"
 *     responses:
 *       200:
 *         description: User followed successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User to follow not found
 */
router.delete("/social/unfollow", unfollowUsers);

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to user information
 */

/**
 * @swagger
 * /api/{userTag}:
 *   get:
 *     summary: Find a user by their tag
 *     tags: [Users]
 *     parameters:
 *       - name: userTag
 *         in: path
 *         required: true
 *         description: The tag of the user to find
 *         schema:
 *           type: string
 *           example: "@NiahUwu"
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get("/:userTag", findUsersByTag);

/**
 * @swagger
 * /api/{userTag}/followers:
 *   get:
 *     summary: Get followers of a user
 *     tags: [Users]
 *     parameters:
 *       - name: userTag
 *         in: path
 *         required: true
 *         description: The tag of the user to retrieve followers for
 *         schema:
 *           type: string
 *           example: "@NiahUwu"
 *     responses:
 *       200:
 *         description: List of followers
 *       404:
 *         description: User not found
 */
router.get("/:userTag/followers", getFollowers);

/**
 * @swagger
 * /api/{userTag}/followings:
 *   get:
 *     summary: Get followings of a user
 *     tags: [Users]
 *     parameters:
 *       - name: userTag
 *         in: path
 *         required: true
 *         description: The tag of the user to retrieve followings for
 *         schema:
 *           type: string
 *           example: "@NiahUwu"
 *     responses:
 *       200:
 *         description: List of followings
 *       404:
 *         description: User not found
 */
router.get("/:userTag/followings", getFollwings);

module.exports = router;

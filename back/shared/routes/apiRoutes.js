const express = require("express");
const router = express.Router();
const { newTweet, listTweetsByIDs, listTweetsInFeeds } = require("../../tweets/infraestructure/tweetsController");
const { registerUserItem, loginUserItem, logoutUserItem, checkAuthentication } = require("../../auth/infraestructure/authController");
const { followUsers } = require("../../social/infraestructure/socialController");
const { unfollowUsers } = require("../../social/infraestructure/socialController");
const { findUsersByTag, getFollowers, getFollwings } = require("../../users/infraestructure/userController");

/**
 * @swagger
 * tags:
 *   name: Tweets
 *   description: Operations related to tweets
 */

/**
 /**
 /**
 * @swagger
 * /api/tweets:
 *   post:
 *     summary: Create a new tweet
 *     tags: [Tweets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *                 example: "Niah"
 *               userTag:
 *                 type: string
 *                 example: "@NiahUwu"
 *               content:
 *                 type: string
 *                 example: "awua con sabor a awua"
 *     responses:
 *       201:
 *         description: Tweet created successfully
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Internal server error
 */
router.post("/tweets", checkAuthentication, newTweet);

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
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userTag:
 *                 type: string
 *                 example: "@NiahUwu"
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
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: registerData
 *         description: User Register credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userName:
 *               type: string
 *               example: "Prototype"
 *             userLastName:
 *               type: string
 *               example: "User"
 *             userTag:
 *               type: string
 *               example: "@UserPrototypeTag"
 *             email:
 *               type: string
 *               example: "admin@admin.com"
 *             password:
 *               type: string
 *               example: "CurrentPassword.1"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post("/register", registerUserItem);

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Auth]
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: loginData
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userTag:
 *               type: string
 *               example: "@UserPrototypeTag"
 *             password:
 *               type: string
 *               example: "CurrentPassword.1"
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userTag:
 *                 type: string
 *                 example: "@NiahUwu"
 *               userToFollowTag:
 *                 type: string
 *                 example: "@Magdalena"
 *     responses:
 *       200:
 *         description: User followed successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User to follow not found
 */
router.put("/social/follow", checkAuthentication,followUsers);


/**
 * @swagger
 * /api/social/unFollow:
 *   delete:
 *     summary: unfollow a user
 *     tags: [Social]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userTag:
 *                 type: string
 *                 example: "@NiahUwu"
 *               userToUnfollowTag:
 *                 type: string
 *                 example: "@Magdalena"
 *     responses:
 *       200:
 *         description: User followed successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: User to follow not found
 */
router.delete("/social/unfollow", checkAuthentication, unfollowUsers);

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
router.get("/:userTag/followers", checkAuthentication,getFollowers);

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
router.get("/:userTag/followings", checkAuthentication, getFollwings);

module.exports = router;

const { listTweetsByID } = require("../../../tweets/aplication/listTweetsByID");
const { findUser } = require("../../../users/infraestructure/userAdapters");
const Tweet = require("../../../tweets/domain/tweetsModel");

jest.mock("../../../users/infraestructure/userAdapters");
jest.mock("../../../tweets/domain/tweetsModel");

describe('listTweetsByID', () => {

  describe('List tweets the user', () => {

    describe('Tweets the user return successfully', () => {

      test('should return tweets when user is found', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUser = { tweets: ["tweetId1", "tweetId2"] };
        const mockTweets = [
          { _id: "tweetId1", content: "First tweet" },
          { _id: "tweetId2", content: "Second tweet" }
        ];

        findUser.mockResolvedValue({ user: mockUser });
        Tweet.find.mockResolvedValue(mockTweets);

        const result = await listTweetsByID(mockUserTag);

        expect(result).toEqual({
          message: "Tweets retrieved successfully",
          tweets: mockTweets,
        });
      });
    });

    describe('User tag validation', () => {

      test('should return error message if user tag is not provided', async () => {
        const result = await listTweetsByID();

        expect(result).toEqual({
          message_error: "User tag is required",
        });
      });
    });

    describe('User not found', () => {

      test('should return error message when user is not found', async () => {
        const mockUserTag = "@UserPrototypeTag";

        findUser.mockResolvedValue({ message_error: "[ERROR] User not found" });

        const result = await listTweetsByID(mockUserTag);

        expect(result).toEqual({
          menssage_error: "[ERROR] User not found",
        });
      });
    });

    describe('Error during tweet retrieval', () => {

      test('should return error message when there is an error retrieving tweets', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUser = { tweets: ["tweetId1", "tweetId2"] };

        findUser.mockResolvedValue({ user: mockUser });
        Tweet.find.mockImplementation(() => {
          throw new Error("[ERROR] Database error");
        });

        const result = await listTweetsByID(mockUserTag);

        expect(result).toEqual({
          message_error: "Failed to list tweets of the userError: [ERROR] Database error",
        });
      });
    });
  });
});

const { listTweetsInFeed } = require("../../../tweets/aplication/listTweetsInFeed");
const { getFollowings } = require("../../../users/infraestructure/userAdapters");
const Tweet = require("../../../tweets/domain/tweetsModel");
const { listTweetsByID } = require("../../../tweets/aplication/listTweetsByID");

jest.mock("../../../users/infraestructure/userAdapters");
jest.mock("../../../tweets/domain/tweetsModel");
jest.mock("../../../tweets/aplication/listTweetsByID");

describe('listTweetsInFeed', () => {

  describe('Retrieve tweets in feed', () => {

    describe('No user logged in', () => {

      test('should return all tweets when userTag is not provided', async () => {
        const mockTweets = [
          { content: "Tweet 1", createTweetAt: new Date("2023-01-01") },
          { content: "Tweet 2", createTweetAt: new Date("2023-01-02") },
        ];

        Tweet.find.mockReturnValue({ sort: jest.fn().mockResolvedValue(mockTweets) });

        const result = await listTweetsInFeed();

        expect(result).toEqual({
          message: "Tweet returned successfully for non-logged user",
          tweetsInFeed: mockTweets,
        });
      });
    });

    describe('User is logged in', () => {

      test('should return error message if user tweets retrieval fails', async () => {
        const mockUserTag = "@UserPrototypeTag";
        listTweetsByID.mockResolvedValue({ message_error: "[ERROR] User tweets not found" });

        const result = await listTweetsInFeed(mockUserTag);

        expect(result).toEqual({
          message_error: "[ERROR] User tweets not found",
        });
      });

      test('should return error message if getFollowings fails', async () => {
        const mockUserTag = "@UserPrototypeTag";
        listTweetsByID.mockResolvedValue({ tweets: [] });
        getFollowings.mockResolvedValue({ message_error: "[ERROR] Followings not found" });

        const result = await listTweetsInFeed(mockUserTag);

        expect(result).toEqual({
          message_error: "[ERROR] Followings not found",
        });
      });

      test('should retrieve tweets from followings successfully', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockFollowings = { followingTags: ["@Following1", "@Following2"] };
        const mockUserTweets = { tweets: [{ content: "User tweet", createTweetAt: new Date("2023-01-03") }] };
        const mockFollowingTweets = [
          { content: "Following tweet 1", createTweetAt: new Date("2023-01-01") },
          { content: "Following tweet 2", createTweetAt: new Date("2023-01-02") },
        ];

        listTweetsByID.mockResolvedValue(mockUserTweets);

        getFollowings.mockResolvedValue(mockFollowings);

        listTweetsByID
          .mockResolvedValueOnce({ tweets: mockFollowingTweets })
          .mockResolvedValueOnce({ tweets: mockFollowingTweets });

        const result = await listTweetsInFeed(mockUserTag);

        const expectedResult = {
          message: "Tweets retrieved successfully",
          tweetsInFeed: [
            ...mockUserTweets.tweets,
            ...mockFollowingTweets,
            ...mockFollowingTweets,
          ],
        };

        expect(result).toEqual({
          message: expectedResult.message,
          tweetsInFeed: expect.arrayContaining(expectedResult.tweetsInFeed.sort((a, b) => new Date(b.createTweetAt) - new Date(a.createTweetAt))),
        });
      });
    });

    describe('Error during tweets retrieval', () => {

      test('should return error message when there is an error retrieving tweets', async () => {
        const mockUserTag = "@UserPrototypeTag";
        listTweetsByID.mockImplementation(() => {
          throw new Error("[ERROR] Retrieval error");
        });

        const result = await listTweetsInFeed(mockUserTag);

        expect(result).toEqual({
          message_error: "Failed to search tweets: Error: [ERROR] Retrieval error",
        });
      });
    });
  });
});

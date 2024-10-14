const { newTweets } = require("../../../tweets/aplication/newTweet");
const { findUser } = require("../../../users/infraestructure/userAdapters");
const Tweet = require("../../../tweets/domain/tweetsModel");
const { validationTweetStructure } = require("../../../tweets/domain/tweetsValidators");

jest.mock("../../../users/infraestructure/userAdapters");
jest.mock("../../../tweets/domain/tweetsModel");
jest.mock("../../../tweets/domain/tweetsValidators");

describe('newTweet.js', () => {

  describe('Create a new tweet', () => {

    describe('Create tweet successfully', () => {

      test('should return info for tweet', async () => {

        const mockTweetData = {
          userName: "Prototype",
          userTag: "@UserPrototypeTag",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc commodo justo nec metus porttitor condimentum. Nulla placerat felis sed dictum consequat. Proin imperdiet felis nec lacus varius, vel eleifend augue facilisis",
        };

        const mockSavedTweet = {
          userName: "Prototype",
          userTag: "@UserPrototypeTag",
          content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc commodo justo nec metus porttitor condimentum. Nulla placerat felis sed dictum consequat. Proin imperdiet felis nec lacus varius, vel eleifend augue facilisis",
        };

        validationTweetStructure.mockReturnValue({ validation: true });
        findUser.mockResolvedValue({ user: { tweets: [], save: jest.fn() } });

        Tweet.mockImplementation(() => ({
          ...mockSavedTweet,
          save: jest.fn().mockResolvedValue(mockSavedTweet),
        }));

        const result = await newTweets(mockTweetData);

        expect(result).toEqual({
          menssage: "[INFO] Tweet created successfully",
          tweet: {
            userName: "Prototype",
            userTag: "@UserPrototypeTag",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc commodo justo nec metus porttitor condimentum. Nulla placerat felis sed dictum consequat. Proin imperdiet felis nec lacus varius, vel eleifend augue facilisis",
            save: expect.any(Function)
          },
        });
      });
    });

    describe('The tweet does not have a valid structure', () => {

      test('should return error message for invalid tweet structure', async () => {

        const invalidTweetData = {
          userName: "Prototype",
          userTag: "@UserPrototypeTag",
          content: "",
        };

        validationTweetStructure.mockReturnValue({ validation: false, message: "[ERROR] The tweet content is empty" });

        const result = await newTweets(invalidTweetData);

        expect(result).toEqual({
          menssage_error: "[ERROR] The tweet content is empty",
        });
      });
    });

    describe('User not found', () => {

      test('should return error message when user is not found', async () => {
        const mockTweetData = {
          userName: "Prototype",
          userTag: "@UserPrototypeTag",
          content: "Valid tweet content",
        };

        validationTweetStructure.mockReturnValue({ validation: true });
        findUser.mockResolvedValue({ message_error: "[ERROR] User not found" });

        const result = await newTweets(mockTweetData);

        expect(result).toEqual({
          menssage_error: "[ERROR] User not found",
        });
      });
    });

    describe('Error during tweet creation', () => {

      test('should return error message when tweet creation fails', async () => {
        const mockTweetData = {
          userName: "Prototype",
          userTag: "@UserPrototypeTag",
          content: "Valid tweet content",
        };

        validationTweetStructure.mockReturnValue({ validation: true });
        findUser.mockResolvedValue({ user: { tweets: [], save: jest.fn() } });

        Tweet.mockImplementation(() => {
          throw new Error("[ERROR] Database error");
        });

        const result = await newTweets(mockTweetData);

        expect(result).toEqual({
          menssage_error: "[ERROR] Failed to create tweet in databaseError: [ERROR] Database error",
        });
      });
    });
  });
});

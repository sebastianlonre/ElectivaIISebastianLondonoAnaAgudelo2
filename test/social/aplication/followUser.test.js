const { followUser } = require("../../../social/aplication/followUser");
const { findUser } = require("../../../users/infraestructure/userAdapters");
const { Followings, Followers } = require("../../../social/domain/socialModel");
const { checkIfAlreadyFollowing } = require("../../../social/aplication/checkFollowing");

jest.mock("../../../users/infraestructure/userAdapters");
jest.mock("../../../social/domain/socialModel");
jest.mock("../../../social/aplication/checkFollowing");

describe('followUser', () => {
  describe('Follow a user', () => {
    describe('User successfully followed', () => {
      test('should return success message when user is found and followed', async () => {
        const UserTag = "@UserPrototypeTag";
        const UserToFollowTag = "@NiahUwu";

        const mockUser = {
          followings: [],
          save: jest.fn().mockResolvedValue()
        };

        const mockUserToFollow = {
          followers: [],
          save: jest.fn().mockResolvedValue()
        };

        findUser.mockResolvedValueOnce({ user: mockUser });
        findUser.mockResolvedValueOnce({ user: mockUserToFollow });
        checkIfAlreadyFollowing.mockResolvedValue(false);

        Followings.prototype.save = jest.fn().mockResolvedValue();
        Followers.prototype.save = jest.fn().mockResolvedValue();

        const result = await followUser(UserTag, UserToFollowTag);

        expect(result).toEqual({
          menssage: `The user ${UserTag} now follows ${UserToFollowTag}`,
        });
        expect(mockUser.followings.length).toBe(1);
    });

    });

    describe('User tag validation', () => {
      test('should return error message if user tag is not provided', async () => {
        const result = await followUser();

        expect(result).toEqual({
          menssage_error: "user tag is require",
        });
      });
    });

    describe('User not found', () => {
      test('should return error message when user is not found', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToFollowTag = "@UserToFollowTag";

        findUser.mockResolvedValueOnce({ message_error: "[ERROR] User not found" });

        const result = await followUser(mockUserTag, mockUserToFollowTag);

        expect(result).toEqual({
          menssage_error: "[ERROR] User not found",
        });
      });
    });

    describe('User to follow not found', () => {
      test('should return error message when user to follow is not found', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToFollowTag = "@UserToFollowTag";
        const mockUser = { followings: [] };

        findUser.mockResolvedValueOnce({ user: mockUser });
        findUser.mockResolvedValueOnce({ message_error: "[ERROR] User not found" });

        const result = await followUser(mockUserTag, mockUserToFollowTag);

        expect(result).toEqual({
          menssage_error: "[ERROR] User not found",
        });
      });
    });

    describe('User already follows', () => {
      test('should return error message when user is already following', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToFollowTag = "@UserToFollowTag";
        const mockUser = { followings: [] };
        const mockUserToFollow = {};

        findUser.mockResolvedValueOnce({ user: mockUser });
        findUser.mockResolvedValueOnce({ user: mockUserToFollow });
        checkIfAlreadyFollowing.mockResolvedValue(true);

        const result = await followUser(mockUserTag, mockUserToFollowTag);

        expect(result).toEqual({
          menssage_error: `User ${mockUserTag} already follows ${mockUserToFollowTag}`,
        });
      });
    });

    describe('Error during follow operation', () => {
      test('should return error message when there is an error during follow operation', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToFollowTag = "@UserToFollowTag";
        const mockUser = { followings: [] };
        const mockUserToFollow = {};

        findUser.mockResolvedValueOnce({ user: mockUser });
        findUser.mockResolvedValueOnce({ user: mockUserToFollow });
        checkIfAlreadyFollowing.mockResolvedValue(false);

        Followings.prototype.save.mockRejectedValue(new Error("[ERROR] Database error"));

        const result = await followUser(mockUserTag, mockUserToFollowTag);

        expect(result).toEqual({
          menssage_error: "Failed to follow user: [ERROR] Database error",
        });
      });
    });

  });
});

const { unFollowUser } = require("../../../social/aplication/unFollowUser");
const { findUser } = require("../../../users/infraestructure/userAdapters");
const { Followings, Followers } = require("../../../social/domain/socialModel");
const { checkIfAlreadyFollowing } = require("../../../social/aplication/checkFollowing");

jest.mock("../../../users/infraestructure/userAdapters");
jest.mock("../../../social/domain/socialModel");
jest.mock("../../../social/aplication/checkFollowing");

describe('unFollowUser', () => {
  describe('Unfollow a user', () => {
    describe('User successfully unfollowed', () => {
      test('should return success message when user is found and unfollowed', async () => {
        const userTag = "@UserPrototypeTag";
        const userToUnfollowTag = "@NiahUwu";

        const mockUser = {
          followings: [userToUnfollowTag],
          save: jest.fn().mockResolvedValue()
        };

        const mockUserToUnfollow = {
          followers: [userTag],
          save: jest.fn().mockResolvedValue()
        };

        findUser.mockResolvedValueOnce({ user: mockUser });
        findUser.mockResolvedValueOnce({ user: mockUserToUnfollow });
        checkIfAlreadyFollowing.mockResolvedValue(true);

        Followings.findOneAndDelete.mockResolvedValue();
        Followers.findOneAndDelete.mockResolvedValue();

        const result = await unFollowUser(userTag, userToUnfollowTag);

        mockUser.followings = mockUser.followings.filter(tag => tag !== userToUnfollowTag);
        mockUserToUnfollow.followers = mockUserToUnfollow.followers.filter(tag => tag !== userTag);

        expect(result).toEqual({
          menssage: `User ${userTag} has unfollowed ${userToUnfollowTag}`,
        });
        expect(mockUser.followings.length).toBe(0);
        expect(mockUserToUnfollow.followers.length).toBe(0);
      });

    });

    describe('User tag validation', () => {
      test('should return error message if user tag is not provided', async () => {
        const result = await unFollowUser();

        expect(result).toEqual({
          menssage_error: "user tag is require",
        });
      });
    });

    describe('User not found', () => {
      test('should return error message when user is not found', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToUnfollowTag = "@UserToUnfollowTag";

        findUser.mockResolvedValueOnce({ message_error: "[ERROR] User not found" });

        const result = await unFollowUser(mockUserTag, mockUserToUnfollowTag);

        expect(result).toEqual({
          menssage_error: "[ERROR] User not found",
        });
      });
    });

    describe('User to unfollow not found', () => {
      test('should return error message when user to unfollow is not found', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToUnfollowTag = "@UserToUnfollowTag";
        const mockUser = { followings: [] };

        findUser.mockResolvedValueOnce({ user: mockUser });
        findUser.mockResolvedValueOnce({ message_error: "[ERROR] User not found" });

        const result = await unFollowUser(mockUserTag, mockUserToUnfollowTag);

        expect(result).toEqual({
          menssage_error: "[ERROR] User not found",
        });
      });
    });

    describe('User not following', () => {
      test('should return error message when user is not following', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToUnfollowTag = "@UserToUnfollowTag";
        const mockUser = { followings: [] };
        const mockUserToUnfollow = {};

        findUser.mockResolvedValueOnce({ user: mockUser });
        findUser.mockResolvedValueOnce({ user: mockUserToUnfollow });
        checkIfAlreadyFollowing.mockResolvedValue(false);

        const result = await unFollowUser(mockUserTag, mockUserToUnfollowTag);

        expect(result).toEqual({
          menssage_error: `User ${mockUserTag} does not follow ${mockUserToUnfollowTag}`,
        });
      });
    });

    describe('Error during unfollow operation', () => {
      test('should return error message when there is an error during unfollow operation', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToUnfollowTag = "@UserToUnfollowTag";
        const mockUser = { followings: [mockUserToUnfollowTag] };
        const mockUserToUnfollow = {};

        findUser.mockResolvedValueOnce({ user: mockUser });
        findUser.mockResolvedValueOnce({ user: mockUserToUnfollow });
        checkIfAlreadyFollowing.mockResolvedValue(true);

        Followings.findOneAndDelete.mockRejectedValue(new Error("[ERROR] Database error"));

        const result = await unFollowUser(mockUserTag, mockUserToUnfollowTag);

        expect(result).toEqual({
          menssage_error: "Failed to unfollow user: [ERROR] Database error",
        });
      });
    });
  });
});

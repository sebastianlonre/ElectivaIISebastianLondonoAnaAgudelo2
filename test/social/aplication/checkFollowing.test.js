const { checkIfAlreadyFollowing } = require("../../../social/aplication/checkFollowing");
const { Followings } = require("../../../social/domain/socialModel");

jest.mock("../../../social/domain/socialModel");

describe('checkIfAlreadyFollowing', () => {

  describe('Check follow status', () => {

    describe('User is already following', () => {

      test('should return true if user is already following', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToFollowTag = "@FollowedUserTag";

        Followings.findOne.mockResolvedValue({ userTag: mockUserTag, followingTag: mockUserToFollowTag });

        const result = await checkIfAlreadyFollowing(mockUserTag, mockUserToFollowTag);

        expect(result).toBe(true);
      });
    });

    describe('User is not following', () => {

      test('should return false if user is not following', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToFollowTag = "@FollowedUserTag";

        Followings.findOne.mockResolvedValue(null);

        const result = await checkIfAlreadyFollowing(mockUserTag, mockUserToFollowTag);

        expect(result).toBe(false);
      });
    });

    describe('Error during follow status check', () => {

      test('should return error message if there is an error checking follow status', async () => {
        const mockUserTag = "@UserPrototypeTag";
        const mockUserToFollowTag = "@FollowedUserTag";

        Followings.findOne.mockImplementation(() => {
          throw new Error("[ERROR] Database error");
        });

        const result = await checkIfAlreadyFollowing(mockUserTag, mockUserToFollowTag);

        expect(result).toEqual({
          menssage_error: "Error checking follow status: Error: [ERROR] Database error",
        });
      });
    });
  });
});

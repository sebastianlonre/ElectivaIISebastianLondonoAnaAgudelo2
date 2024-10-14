const httpMocks = require('node-mocks-http');
const { unfollowUsers } = require('../../../social/infraestructure/socialController');
const { unFollowUser } = require('../../../social/aplication/unFollowUser');

jest.mock('../../../social/aplication/unfollowUser');

describe('unfollowUsersController.js', () => {

  describe('Unfollow a user', () => {

    describe('with valid fields', () => {

      test('should return a success response for unfollowing a user', async () => {
        const mockRequestBody = {
          userTag: "@UserPrototypeTag",
          userToUnfollowTag: "@UserToUnfollowTag"
        };

        const request = httpMocks.createRequest({
          method: 'POST',
          url: '/unfollow',
          body: mockRequestBody
        });

        const response = httpMocks.createResponse();

        unFollowUser.mockResolvedValue({
          message: "Successfully unfollowed user"
        });

        await unfollowUsers(request, response);

        expect(response.statusCode).toBe(200);
        const data = response._getJSONData();
        expect(data).toEqual({
          message: "Successfully unfollowed user"
        });
      });

    });

    describe('with invalid fields', () => {

      test('should return an error for invalid unfollow request', async () => {
        const request = httpMocks.createRequest({
          method: 'POST',
          url: '/unfollow',
          body: {
            userTag: "@UserPrototypeTag",
            userToUnfollowTag: null
          }
        });

        const response = httpMocks.createResponse();

        unFollowUser.mockResolvedValue({
          menssage_error: "Invalid user tags"
        });

        await unfollowUsers(request, response);

        expect(response.statusCode).toBe(400);
        const data = response._getJSONData();
        expect(data).toEqual({
          menssage_error: "Invalid user tags"
        });
      });

    });

    describe('with a server error', () => {

      test('should return a 500 error for server issues', async () => {
        const request = httpMocks.createRequest({
          method: 'POST',
          url: '/unfollow',
          body: {
            userTag: "@UserPrototypeTag",
            userToUnfollowTag: "@UserToUnfollowTag"
          }
        });

        const response = httpMocks.createResponse();

        unFollowUser.mockRejectedValue(new Error('Database connection failed'));

        await unfollowUsers(request, response);

        expect(response.statusCode).toBe(500);
        const data = response._getJSONData();
        expect(data).toEqual({
          menssage_error: "[ERROR] Unexpected server error: Error: Database connection failed"
        });
      });

    });

  });
});

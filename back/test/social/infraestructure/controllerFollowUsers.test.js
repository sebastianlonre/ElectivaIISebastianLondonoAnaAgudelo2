const httpMocks = require('node-mocks-http');
const { followUser } = require('../../../social/aplication/followUser');
const { followUsers } = require('../../../social/infraestructure/socialController');

jest.mock('../../../social/aplication/followUser');

describe('followUsersController.js', () => {

  describe('Follow a user', () => {

    describe('with valid fields', () => {

      test('should return a success response for following a user', async () => {
        const mockRequestBody = {
          userTag: "@UserPrototypeTag",
          userToFollowTag: "@UserToFollowTag"
        };

        const request = httpMocks.createRequest({
          method: 'POST',
          url: '/follow',
          body: mockRequestBody
        });

        const response = httpMocks.createResponse();

        followUser.mockResolvedValue({
          message: "Successfully followed user"
        });

        await followUsers(request, response);

        expect(response.statusCode).toBe(201);
        const data = response._getJSONData();
        expect(data).toEqual({
          message: "Successfully followed user"
        });
      });

    });

    describe('with invalid fields', () => {

      test('should return an error for invalid follow request', async () => {
        const request = httpMocks.createRequest({
          method: 'POST',
          url: '/follow',
          body: {
            userTag: "@UserPrototypeTag",
            userToFollowTag: null
          }
        });

        const response = httpMocks.createResponse();

        followUser.mockResolvedValue({
          menssage_error: "Invalid user tags"
        });

        await followUsers(request, response);

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
          url: '/follow',
          body: {
            userTag: "@UserPrototypeTag",
            userToFollowTag: "@UserToFollowTag"
          }
        });

        const response = httpMocks.createResponse();

        followUser.mockRejectedValue(new Error('Database connection failed'));

        await followUsers(request, response);

        expect(response.statusCode).toBe(500);
        const data = response._getJSONData();
        expect(data).toEqual({
          menssage_error: "[ERROR] Unexpected server error: Error: Database connection failed"
        });
      });

    });

  });
});

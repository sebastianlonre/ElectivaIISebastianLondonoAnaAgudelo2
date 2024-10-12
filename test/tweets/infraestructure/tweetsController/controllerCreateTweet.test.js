const httpMocks = require('node-mocks-http');
const tweetsController = require('../../../../tweets/infraestructure/tweetsController');
const { newTweets } = require('../../../../tweets/aplication/newTweet');

jest.mock('../../../../tweets/aplication/newTweet');

const mockTweet = {
  userName: "Prototype",
  userTag: "@UserPrototypeTag",
  content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit"
};

describe('tweetsController.js', () => {

  describe('Create new tweet', () => {

    describe('with valid fields', () => {

      test('should return a created tweet', async () => {

        const request = httpMocks.createRequest({
          method: 'POST',
          url: '/tweets',
          body: mockTweet
        });

        const response = httpMocks.createResponse();

        newTweets.mockResolvedValue(mockTweet);

        await tweetsController.newTweet(request, response);

        expect(response.statusCode).toBe(201);

        const data = response._getJSONData();
        expect(data).toEqual(mockTweet);
      });

    });

    describe('with invalid fields', () => {

      test('should return an error for invalid tweet data', async () => {

        const request = httpMocks.createRequest({
          method: 'POST',
          url: '/tweets',
          body: {
            mockTweet
          }
        });

        const response = httpMocks.createResponse();

        newTweets.mockResolvedValue({
          menssage_error: "Invalid tweet content"
        });

        await tweetsController.newTweet(request, response);

        expect(response.statusCode).toBe(400);

        const data = response._getJSONData();
        expect(data).toEqual({
          menssage_error: "Invalid tweet content"
        });
      });
    });

    describe('with a server error', () => {

      test('should return a 500 error for server issues', async () => {

        const request = httpMocks.createRequest();

        const response = httpMocks.createResponse();

        newTweets.mockRejectedValue(new Error('Database connection failed'));

        await tweetsController.newTweet(request, response);

        expect(response.statusCode).toBe(500);

        const data = response._getJSONData();
        expect(data).toEqual({
          menssage_error: "[ERROR] Unexpected server error Error: Database connection failed"
        });
      });

    });
  });
});

const httpMocks = require('node-mocks-http');
const tweetsController = require('../../../../tweets/infraestructure/tweetsController');
const { listTweetsInFeed } = require('../../../../tweets/aplication/listTweetsInFeed');

jest.mock('../../../../tweets/aplication/listTweetsByID');
jest.mock('../../../../tweets/aplication/listTweetsInFeed')

const tweetsMocks = (
  { id: 'tweet1', content: 'First tweet' },
  { id: 'tweet2', content: 'Second tweet' },
  { id: 'tweet3', content: 'Third tweet' }
);

describe('tweetsController.js', () => {

  describe('List tweets in the feed', () => {

    describe('with a valid data', () => {

      test('should return all tweets for feed', async () => {

        const request = httpMocks.createRequest({
          method: 'POST',
          url: '/tweets/feed',
          body: {userTag: "@UserPrototypeTag"}
        });

        const response = httpMocks.createResponse();

        listTweetsInFeed.mockResolvedValue({
          tweetsMocks
        });

        await tweetsController.listTweetsInFeeds(request, response);

        expect(response.statusCode).toBe(200);

        const data = response._getJSONData();

        expect(data).toEqual({
          tweetsMocks
        });

      });
    });

    describe('With a invalid data', () => {

      test('should return an error for invalid data ', async () => {
        const request = httpMocks.createRequest({
          method: 'POST',
          url: '/tweets/feed',
          body: {userTag: "@UserPrototypeT"}
        });

        const response = httpMocks.createResponse();

        listTweetsInFeed.mockResolvedValue({
          menssage_error: "User not found"
        })

        await tweetsController.listTweetsInFeeds(request, response);
       });
     });

    describe('With a server error', () => {

      test('should return a 500 error for server issues', async () => {

        const request = httpMocks.createRequest();

        const response = httpMocks.createResponse();

        listTweetsInFeed.mockRejectedValue(new Error('Database connection failed'));

        await tweetsController.listTweetsInFeeds(request, response);

        expect(response.statusCode).toBe(500);

        const data = response._getJSONData();
        expect(data).toEqual({
          menssage_error: "[ERROR] Unexpected server error Error: Database connection failed"
        });
       });
     });
  });
});

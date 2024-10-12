const httpMocks = require('node-mocks-http');
const tweetsController = require('../../../../tweets/infraestructure/tweetsController');
const { listTweetsByID } = require('../../../../tweets/aplication/listTweetsByID');
const { findUser } = require('../../../../users/infraestructure/userAdapters');

jest.mock('../../../../tweets/aplication/listTweetsByID');
jest.mock('../../../../users/infraestructure/userAdapters');

const tweetsMocks = (
  { id: 'tweet1', content: 'First tweet' },
  { id: 'tweet2', content: 'Second tweet' },
  { id: 'tweet3', content: 'Third tweet' }
);

describe('tweetsController.js', () => {

  describe('List tweets with tag', () => {

    describe('With valid userTag', () => {

      test('should return user tweets ', async () => {

        const request = httpMocks.createRequest({
          method: 'GET',
          url: '/tweets/PrototypeTag',
          params: { userTag: 'PrototypeTag' }
        });

        const response = httpMocks.createResponse();

        listTweetsByID.mockResolvedValue({
          message: "Tweets retrieved successfully",
          tweets: tweetsMocks
        });

        await tweetsController.listTweetsByIDs(request, response);

        expect(response.statusCode).toBe(200);

        const data = response._getJSONData();

        expect(data).toEqual({
          message: "Tweets retrieved successfully",
          tweets: tweetsMocks
        })
       });
    });

    describe('With invalid data', () => {

      test('should first', async () => {

        const request = httpMocks.createRequest({
          method: 'GET',
          url: '/tweets/PrototypeTag',
          params: { userTag: 'PrototypeTa' }
        });

        const response = httpMocks.createResponse();

        listTweetsByID.mockResolvedValue({
          message_error: "Failed to list tweets of the user",
        });

        await tweetsController.listTweetsByIDs(request, response);

        expect(response.statusCode).toBe(400);
        const data = response._getJSONData();
        expect(data).toEqual({
          message_error: "Failed to list tweets of the user"
        })

      })
     });

     describe('with a server error', () => {
      test('should return a 500 error for server issues', async () => {

        const request = httpMocks.createRequest({
          method: 'GET',
          url: '/tweets/PrototypeTag',
          params: { userTag: 'PrototypeTag' }
        });

        const response = httpMocks.createResponse();

        listTweetsByID.mockRejectedValue(new Error('Database connection failed'));

        await tweetsController.listTweetsByIDs(request, response);

        expect(response.statusCode).toBe(500);

        const data = response._getJSONData();
        expect(data).toEqual({
          menssage_error: "[ERROR] Unexpected server error Error: Database connection failed"
        });
      });
    });

   });
});
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

export const TweetsInFeed = async () => {
  try {
    const tweets = await api.post('/tweets/feed');

    return { ok: true, tweets };
  } catch (error) {

    return { ok: false, message: error.response?.data?.message_error };
  }

}

export const newTweet = async ( content ) => {
  try {
    await api.post('/tweets', {content} );
    return {oK: true};
  } catch (error) {
    return { ok: false, message: error.response?.data?.message_error };
  }
}
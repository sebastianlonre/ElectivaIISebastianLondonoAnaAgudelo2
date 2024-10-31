import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});


export const followUser = async (userToFollowTag) => {
  try {
    await api.put('/social/follow', {userToFollowTag})
    return {ok: true}
  } catch (error) {
    return { ok: false, message: error.response?.data?.menssage_error };
  }
}

export const unfollowUser = async (userToUnfollowTag) => {
  try {
    await api.delete('/social/unfollow', { data: { userToUnfollowTag } });
    return { ok: true };
  } catch (error) {
    return { ok: false, message: error.response?.data?.menssage_error };
  }
};
import axios from 'axios';


const api = axios.create({
  baseURL: 'http://localhost:4000/api',
  withCredentials: true,
});

export const userDataRequest = async (userTag) => {
  try {
    const userInfoResponse = await api.get(`/${userTag}`);
    const userData = userInfoResponse.data;

    return { ok: true, userData };
  } catch (error) {

    return { ok: false, message: error.response?.data?.message_error || "User not found" };
  }
};

export const userRegister = async (userName= '', userLastName = '', userTag= '', email='', password='') => {
  try {
    const response = await api.post("/register", {userName, userLastName, userTag, email, password})
    const { message } = response.data;


    return {ok: true, message}
  } catch (error) {
    return { ok: false, message: error.response?.data?.message_error || "User not found" };
  }
}

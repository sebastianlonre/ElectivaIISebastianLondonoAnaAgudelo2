import axios from 'axios';
import React, { useReducer } from 'react';
import { AuthContext } from './AuthContext';
import { AuthReducer } from '../reducer/authReducer';
import { authTypes } from '../types/authTypes';

const initialState = { logged: false, user: null };

const init = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return {
    logged: !!user,
    user: user,
  };
};

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(AuthReducer, initialState, init);

  const api = axios.create({
    baseURL: 'http://localhost:4000/api',
    withCredentials: true,
  });

  const login = async (userTag = '', password = '') => {
    try {

      const response = await api.post('/login', { userTag, password });
      const { message } = response.data;
      const userInfoResponse = await api.get(`/${userTag}`);
      const userInfo = userInfoResponse.data;

      localStorage.setItem('user', JSON.stringify(userInfo));

      dispatch({
        type: authTypes.login,
        payload: userInfo,
      });

      return { ok: true, message };
    } catch (error) {
      const errorMessage = error.response?.data?.message_error || "Error de inicio de sesión";

      return { ok: false, message: errorMessage };
    }
  };


  const logout = async () => {
    try {
      const response = await api.post('/logout');
      if (response.status === 200) {
        localStorage.removeItem('user');
        dispatch({ type: authTypes.logout });
      }
    } catch (error) {
      console.error("Error al cerrar sesión:", error.response?.data?.message_error || error.message);
    }
  };

  const refreshUserInfo = async (userTag) => {
    try {
      const userInfoResponse = await api.get(`/${userTag}`);
      const updatedUserInfo = userInfoResponse.data;
      dispatch({
        type: authTypes.refreshUser,
        payload: updatedUserInfo
      });
    } catch (error) {
      console.error("Error al actualizar información del usuario:", error.response?.data?.message_error || error.message);
    }
  };



  return (
    <AuthContext.Provider
      value={{
        ...authState,
        login,
        logout,
        refreshUserInfo
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

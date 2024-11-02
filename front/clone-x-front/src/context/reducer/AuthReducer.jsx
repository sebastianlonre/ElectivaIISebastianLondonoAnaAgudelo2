import { authTypes } from "../types/authTypes";

export const AuthReducer = (state, action) => {
  switch (action.type) {
    case authTypes.login:
      return {
        ...state,
        logged: true,
        user: action.payload
      };
    case authTypes.logout:
      return {
        ...state,
        logged: false,
        user: null
      };
    case authTypes.refreshUser:
      return {
        ...state,
        user: action.payload
      };
    case authTypes.error:
      return {
        ...state,
        errorMessage: action.payload?.errorMessage
      };
    default:
      return state;
  }
};

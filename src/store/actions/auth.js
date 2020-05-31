import * as actionTypes from "./actionsTypes";
import axios from "axios";

export const authStart = () => {
  console.log("auth_sart hit");
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (userId, idToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    idToken: idToken,
  };
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const authLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT_INITIATE,
  };
};
export const authLogoutSuccess = () => {
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
export const authLogoutChecker = (timer) => {
  return {
    type: actionTypes.AUTH_LOGOUT_CHECKER,
    timer: timer * 1000,
  };
};

export const auth = (email, password, signUp) => {
  return {
    type: actionTypes.AUTH,
    email: email,
    password: password,
    signUp: signUp,
  };
};
export const authRedirectPath = (path) => {
  return {
    type: actionTypes.AUTH_REDIRECT_PATH,
    path: path,
  };
};
export const authCheckStatus = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(authLogout());
    } else {
      const expiration = new Date(localStorage.getItem("expireTime"));
      if (expiration >= new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(userId, token));
        dispatch(
          authLogoutChecker(
            (expiration.getTime() - new Date().getTime()) / 1000
          )
        );
      } else {
        dispatch(authLogout());
      }
    }
  };
};

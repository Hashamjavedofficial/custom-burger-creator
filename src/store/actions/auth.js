import * as actionTypes from "./actionsTypes";
import axios from "axios";

const authStart = () => {
  console.log("auth_sart hit");
  return {
    type: actionTypes.AUTH_START,
  };
};
const authSuccess = (userId, idToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    userId: userId,
    idToken: idToken,
  };
};
const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};
export const authLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("expireTime");

  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};
const authLogoutChecker = (timer) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout());
    }, timer * 1000);
  };
};

export const auth = (email, password, signUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: email,
      password: password,
      returnSecureToken: true,
    };
    let address =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeKU-yORpI03mz0yy7riK9R6VINoZ7Bx0";
    if (!signUp) {
      address =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeKU-yORpI03mz0yy7riK9R6VINoZ7Bx0";
    }
    axios
      .post(address, authData)
      .then((response) => {
        const expiration = new Date(
          new Date.getTime() + response.data.expiresIn * 1000
        );
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem("userId", response.data.localId);
        localStorage.setItem("expireTime", expiration);
        dispatch(authSuccess(response.data.localId, response.data.idToken));
        dispatch(authLogoutChecker(response.data.expiresIn));
      })
      .catch((err) => {
        dispatch(authFail(err.response.data.error.message));
      });
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
      if (expiration > new Date()) {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(userId, token));
        dispatch(
          authLogoutChecker(expiration.getSeconds() - new Date().getSeconds())
        );
      } else {
        dispatch(authLogout());
      }
    }
  };
};

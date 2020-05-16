import * as actions from "./actionsTypes";
import axios from "axios";

const authStart = () => {
  console.log("auth_sart hit");
  return {
    type: actions.AUTH_START,
  };
};
const authSuccess = (authData) => {
  return {
    type: actions.AUTH_SUCCESS,
    authData: authData,
  };
};
const authFail = (error) => {
  return {
    type: actions.AUTH_FAIL,
    error: error,
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
        dispatch(authSuccess(response.data));
      })
      .catch((err) => {
        dispatch(authFail(err));
      });
  };
};

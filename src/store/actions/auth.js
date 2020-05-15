import * as actions from "./actionsTypes";

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

export const auth = (email, password) => {
  return (dispatch) => {
    dispatch(authStart());
  };
};

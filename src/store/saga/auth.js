import { put, delay } from "redux-saga/effects";
import * as actions from "../actions/index";
import * as actionTypes from "../actions/actionsTypes";
import axios from "axios";
import { authLogout, authLogoutChecker, authSuccess } from "../actions/index";

export function* authLogoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("userId");
  yield localStorage.removeItem("expireTime");
  yield put(actions.authLogoutSuccess());
}
export function* authLogoutCheckerSaga(action) {
  yield delay(action.timer);
  yield put(actions.authLogout());
}
export function* authSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true,
  };
  let address =
    "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCeKU-yORpI03mz0yy7riK9R6VINoZ7Bx0";
  if (!action.signUp) {
    address =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCeKU-yORpI03mz0yy7riK9R6VINoZ7Bx0";
  }
  try {
    const response = yield axios.post(address, authData);
    const expiration = yield new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("userId", response.data.localId);
    yield localStorage.setItem("expireTime", expiration);
    yield put(
      actions.authSuccess(response.data.localId, response.data.idToken)
    );
    yield put(actions.authLogoutChecker(response.data.expiresIn));
  } catch (err) {
    yield put(actions.authFail(err.response.data.error.message));
  }
}
export function* authCheckStatusSaga(action) {
  const token = yield localStorage.getItem("token");
  if (!token) {
    yield put(actions.authLogout());
  } else {
    const expiration = yield new Date(localStorage.getItem("expireTime"));
    if (expiration >= new Date()) {
      const userId = yield localStorage.getItem("userId");
      console.log(userId);
      yield put(actions.authSuccess(userId, token));
      yield put(
        actions.authLogoutChecker(
          (expiration.getTime() - new Date().getTime()) / 1000
        )
      );
    } else {
      console.log("else");
      yield put(actions.authLogout());
    }
  }
}

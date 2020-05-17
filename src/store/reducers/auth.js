import * as actionTypes from "../actions/actionsTypes";
import { updateObject } from "./utility";
const initialState = {
  userId: null,
  idToken: null,
  error: null,
  loading: false,
  path: "/",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return updateObject(state, { loading: true });
    case actionTypes.AUTH_SUCCESS:
      return updateObject(state, {
        idToken: action.idToken,
        userId: action.userId,
        loading: false,
        error: null,
      });
    case actionTypes.AUTH_LOGOUT:
      return updateObject(state, { userId: null, idToken: null });
    case actionTypes.AUTH_FAIL:
      return updateObject(state, { error: action.error, loading: false });
    case actionTypes.AUTH_REDIRECT_PATH:
      return updateObject(state, { path: action.path });
    default:
      return state;
  }
};

export default reducer;

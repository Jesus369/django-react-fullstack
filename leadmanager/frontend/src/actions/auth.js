import axios from "axios";
import { returnErrors } from "./messages";

import { USER_LOADED, USER_LOADING, AUTH_ERROR } from "./types";

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
  // Pulls USER_LOADING action.type from auth reducers
  dispatch({ type: USER_LOADING });

  // Get Token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "content-type": "application/json"
    }
  };

  if (token) {
    // Adding Authorization to the headers
    config.headers["Authorization"] = `Token ${token}`;
  }

  axios
    .get("api/auth/user", config)
    .then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

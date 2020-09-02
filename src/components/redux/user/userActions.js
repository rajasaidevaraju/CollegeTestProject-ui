import axios from "axios";
import setAuthToken from "./../../../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { isPresent } from "./../../../utils/helper";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  CLEAR_ERRORS,
  EMAIL_EXISTS,
  SEND_VERIFICATION_EMAIL,
} from "./userActionTypes";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("/users/register", userData)
    .then((res) => history.push("/Login")) // re-direct to login on successful register
    .catch((err) => dispatch(get_errors(err)));
};

// Login - get user token
export const loginUser = (userData, history) => (dispatch) => {
  axios
    .post("/users/login", userData)
    .then((res) => {
      const { token } = res.data.result;
      console.log(res.data.result.token);
      localStorage.setItem("jwtToken", token);

      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setCurrentUser(decoded));
      history.push("/");
    })
    .catch((err) => {
      if (
        isPresent(err.response, "data") &&
        isPresent(err.response.data, "isVerified") &&
        !err.isVerified
      ) {
        history.push({ pathname: "/code/" + userData.email });
      }

      dispatch(get_errors(err));
    });
};

export const forgotPassword = (email, history) => (dispatch) => {
  axios
    .get("/users/forgotPassword", { params: { email } })
    .then((res) => {
      history.push("/code");
    })
    .catch((err) => {
      dispatch(get_errors(err));
    });
};

export const sendVerificationEmail = (email) => (dispatch) => {
  axios
    .post("/users/sendVerificationEmail", { email })
    .then((res) => {
      console.log("VERIFIED");
    })
    .catch((err) => {
      dispatch(get_errors(err));
    });
};
const email_exists = () => {
  return {
    type: EMAIL_EXISTS,
  };
};

export const verifyCode = (email, code) => (dispatch) => {
  axios
    .get("/users/verifyCode", { params: { email, code } })
    .then((res) => {
      //history.push("/Login");
    })
    .catch((err) => {
      dispatch(get_errors(err));
    });
};
const get_errors = (err) => {
  if (isPresent(err, "response")) {
    err = err.response.data;
  }

  return {
    type: GET_ERRORS,
    payload: err,
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS,
  };
};
// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};

import {
  SET_VISITORS_ERROR,
  SET_VISITORS,
  SET_VISITORS_MESSAGE,
  SET_VISITORS_LOADING,
} from "./visitorActionTypes";
import axios from "axios";
import { isPresent } from "./../../../utils/helper";
export const get_visitors = () => (dispatch) => {
  set_visitors_loading();
  axios
    .get("./users/getAllVisitors")
    .then((result) => {
      dispatch(set_visitors(result.data));
      dispatch(set_visitors_message("classes successfully loaded"));
    })
    .catch((error) => {
      console.log("here");
      dispatch(set_visitors_error(error));
    });
};
const set_visitors_error = (error) => {
  if (isPresent(error, "response")) {
    error = error.response.data;
  }
  return {
    type: SET_VISITORS_ERROR,
    payload: error,
  };
};

const set_visitors = (visitors) => {
  return {
    type: SET_VISITORS,
    payload: visitors,
  };
};

const set_visitors_message = (message) => {
  return {
    type: SET_VISITORS_MESSAGE,
    payload: message,
  };
};
const set_visitors_loading = () => {
  return {
    type: SET_VISITORS_LOADING,
  };
};

import {
  ADD_CLASS,
  REMOVE_CLASS,
  SET_CLASSES,
  SET_CLASS_ERROR,
} from "./classActionTypes";
import { isPresent } from "./../../../utils/helper";
import axios from "axios";
export const get_classes = () => (dispatch) => {
  axios
    .get("/class/getAllClasses")
    .then((response) => {
      const classesData = response.data;
      dispatch(set_classes(classesData));
    })
    .catch((error) => {
      dispatch(set_errors(error));
    });
};

export const create_class = (className) => (dispatch) => {
  axios
    .post("/class/createClass", { className })
    .then((response) => {
      const classData = response.data;
      dispatch(add_class(classData));
    })
    .catch((error) => {
      dispatch(set_errors(error));
    });
};

export const delete_class = (classId) => (dispatch) => {
  axios
    .post("/class/deleteClass", { classId })
    .then((response) => {
      dispatch(remove_class(classId));
    })
    .catch((error) => {
      dispatch(set_errors(error));
    });
};
const add_class = (data) => {
  return {
    type: ADD_CLASS,
    payload: data,
  };
};

const remove_class = (index) => {
  return {
    type: REMOVE_CLASS,
    payload: index,
  };
};

const set_classes = (data) => {
  return {
    type: SET_CLASSES,
    payload: data,
  };
};

const set_errors = (err) => {
  if (isPresent(err, "response")) {
    err = err.response.data;
  }

  return {
    type: SET_CLASS_ERROR,
    payload: err,
  };
};

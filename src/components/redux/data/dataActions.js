import {
  REQUEST_DATA,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  ADD_TEST,
  SAVE_TEST,
  SAVE_TEST_SUCCESS,
} from "./dataActionTypes";

import axios from "axios";
export const fetchData = () => {
  return (dispatch) => {
    dispatch(request_data());

    axios
      .get("/test/getAllTest")
      .then((response) => {
        const tests = response.data;
        dispatch(request_success(tests));
      })
      .catch((error) => {
        dispatch(request_failure(error.message));
      });
  };
};

export const create_test = (test_id, testName) => {
  return (dispatch) => {
    dispatch(request_data());

    axios
      .post("/test/createTest", { _id: test_id, testName: testName })
      .then((response) => {
        const data = response.data.testData;
        dispatch(add_test(data));
      })
      .catch((error) => {
        dispatch(request_failure(error.message));
      });
  };
};

export const save_test = (test_id, questions, testName) => {
  return (dispatch) => {
    dispatch(request_data());
    const data = { testName: testName, _id: test_id, questions: questions };
    dispatch(save_test_redux(data));
    axios
      .post("/test/saveTest", {
        _id: test_id,
        questions: questions,
        testName: testName,
      })
      .then((response) => {
        dispatch(save_test_success());
      })
      .catch((error) => {
        dispatch(request_failure(error.message));
      });
  };
};

const save_test_redux = (data) => {
  return {
    type: SAVE_TEST,
    payload: data,
  };
};
const save_test_success = () => {
  return {
    type: SAVE_TEST_SUCCESS,
  };
};
const add_test = (data) => {
  return {
    type: ADD_TEST,
    payload: data,
  };
};
export const request_data = () => {
  return {
    type: REQUEST_DATA,
  };
};
export const request_success = (videos) => {
  return {
    type: REQUEST_SUCCESS,
    payload: videos,
  };
};
export const request_failure = (error) => {
  return {
    type: REQUEST_FAILURE,
    payload: error,
  };
};

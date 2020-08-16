import {
  REQUEST_DATA,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  ADD_TEST,
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
        const data = { testData: response.testData, _id: test_id };
        dispatch(add_test(data));
      })
      .catch((error) => {
        dispatch(request_failure(error.message));
      });
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

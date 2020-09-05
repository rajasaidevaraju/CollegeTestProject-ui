import {
  REQUEST_DATA,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  ADD_TEST,
  DELETE_TEST,
  CLEAR_ERROR,
  CLEAR_MESSAGE,
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

export const save_test = (testData) => {
  return (dispatch) => {
    dispatch(request_data());

    axios
      .post("/test/saveTest", {
        testData,
      })
      .then((response) => {
        dispatch(save_test_redux());
      })
      .catch((error) => {
        dispatch(request_failure(error.message));
      });
  };
};

export const delete_test = (testId, history) => {
  return (dispatch) => {
    dispatch(request_data());
    const data = { _id: testId };

    axios
      .post("/test/deleteTest", {
        _id: testId,
      })
      .then((response) => {
        history.push("/");
        dispatch(delete_test_redux(data));
      })
      .catch((error) => {
        dispatch(request_failure(error.message));
      });
  };
};

const delete_test_redux = (data) => {
  return {
    type: DELETE_TEST,
    payload: data,
  };
};
const save_test_redux = () => {
  return {
    type: SAVE_TEST_SUCCESS,
  };
};

export const clear_message = () => {
  return {
    type: CLEAR_MESSAGE,
  };
};

export const clear_error = () => {
  return {
    type: CLEAR_ERROR,
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

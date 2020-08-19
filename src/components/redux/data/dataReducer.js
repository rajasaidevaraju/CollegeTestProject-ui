import {
  REQUEST_DATA,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  ADD_TEST,
  SAVE_TEST,
  DELETE_TEST,
} from "./dataActionTypes";
const initialState = {
  loading: true,
  testsData: {},
  status: "",
  error: "",
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        status: "loading",
        loading: true,
      };

    case REQUEST_SUCCESS:
      return {
        ...state,
        status: "success",
        loading: false,
        testsData: action.payload,
      };
    case REQUEST_FAILURE:
      return {
        ...state,
        status: "error",
        loading: false,
        error: action.payload,
      };
    case ADD_TEST:
      const change = action.payload;
      let changed = state.testsData;
      changed = { ...changed, ...change };
      state = Object.assign({}, state);
      return {
        ...state,
        testsData: changed,
        status: "success",
        loading: false,
      };
    case SAVE_TEST:
      const testName = action.payload.testName;
      const _id = action.payload._id;
      const questions = action.payload.questions;
      let original = state.testsData;
      original[_id].testData.testName = testName;
      original[_id].testData.questions = questions;

      state = Object.assign({}, state);
      return {
        ...state,
        status: "success",
        loading: false,
      };

    case DELETE_TEST:
      const delete_id = action.payload._id;
      delete state.testsData[delete_id];
      state = Object.assign({}, state);
      return {
        ...state,
        status: "success",
        loading: false,
      };
    default:
      return state;
  }
};

export default dataReducer;

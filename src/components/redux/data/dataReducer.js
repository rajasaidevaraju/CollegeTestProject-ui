import {
  REQUEST_DATA,
  REQUEST_SUCCESS,
  REQUEST_FAILURE,
  ADD_TEST,
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
      //state.testsData[action.payload] = { testData: {}, _id: action.payload };
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

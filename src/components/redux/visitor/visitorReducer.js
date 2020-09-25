import {
  SET_VISITORS,
  SET_VISITORS_ERROR,
  SET_VISITORS_MESSAGE,
  SET_VISITORS_LOADING,
} from "./visitorActionTypes";
const initialState = {
  visitors: [],
  loading: false,
  error: "",
  message: "",
};

const visitorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VISITORS:
      return { ...state, visitors: action.payload };
    case SET_VISITORS_ERROR:
      return { ...state, error: action.payload, loading: false };
    case SET_VISITORS_MESSAGE:
      return { ...state, message: action.payload, loading: false };
    case SET_VISITORS_LOADING:
      return { ...state, loading: true };
    default:
      return state;
  }
};

export default visitorReducer;

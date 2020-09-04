import {
  ADD_CLASS,
  REMOVE_CLASS,
  SET_CLASSES,
  SET_CLASS_ERROR,
} from "./classActionTypes";

const initialState = {
  classes: [],
  error: {},
};

const classReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS:
      return {
        ...state,
        classes: [...state.classes, action.payload],
      };

    case REMOVE_CLASS:
      const del_id = action.payload;
      const newArray = state.classes.filter((value) => {
        return value._id != del_id;
      });
      state.classes = newArray;
      return state;

    case SET_CLASSES:
      state.classes = action.payload;
      return state;

    case SET_CLASS_ERROR:
      state.error = action.payload;
      return state;
    default:
      return state;
  }
};

export default classReducer;

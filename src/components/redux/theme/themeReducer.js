import { THEME } from "./themeActionTypes";
const initialState = {
  light_mode: false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case THEME:
      return {
        ...state,
        light_mode: !state.light_mode,
      };
    default:
      return state;
  }
};

export default themeReducer;

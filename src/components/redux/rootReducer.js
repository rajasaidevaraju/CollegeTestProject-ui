import { combineReducers } from "redux";
import themeReducer from "./theme/themeReducer";
import dataReducer from "./data/dataReducer";
import authReducer from "./user/userReducer";
import errorReducer from "./user/errorReducer";

export default combineReducers({
  theme: themeReducer,
  data: dataReducer,
  auth: authReducer,
  error: errorReducer,
});

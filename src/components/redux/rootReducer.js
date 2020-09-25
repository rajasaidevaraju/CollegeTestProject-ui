import { combineReducers } from "redux";
import themeReducer from "./theme/themeReducer";
import dataReducer from "./data/dataReducer";
import authReducer from "./user/userReducer";
import errorReducer from "./user/errorReducer";
import classReducer from "./class/classReducer";
import visitorReducer from "./visitor/visitorReducer";
export default combineReducers({
  theme: themeReducer,
  data: dataReducer,
  auth: authReducer,
  error: errorReducer,
  classData: classReducer,
  visitorData: visitorReducer,
});

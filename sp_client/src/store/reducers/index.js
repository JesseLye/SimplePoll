import { combineReducers } from "redux";
import errors from "./errors";
import authErrors from "./authErrors";
import currentUser from "./currentUser";
import poll from "./poll";
import dashboard from "./dashboard";

const rootReducer = combineReducers({
  currentUser,
  poll,
  dashboard,
  errors,
  authErrors
});

export default rootReducer;

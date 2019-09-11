import { combineReducers } from "redux";
import leads from "./leads";
import errors from "./errors";
import messages from "./messages";

export default combineReducers({
  // leads: leads, or as follows
  leads,
  errors,
  messages
});

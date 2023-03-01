import { combineReducers } from "@reduxjs/toolkit";
import createNewUser from "./NewUser";
import MessagsSlice from "./MessagsSlace";
import Alerts from "./AlerSlace";
import LogUser from "./LogSlice";
import StatusAlertsApi from "./StatusApiAlertSlice";

export default combineReducers({
  createNewUser,
  MessagsSlice,
  Alerts,
  StatusAlertsApi,
  LogUser,
});

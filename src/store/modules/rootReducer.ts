import { combineReducers } from "@reduxjs/toolkit";
import createNewUser from "./NewUser";
import MessagsSlice from "./MessagsSlace";
import Alerts from "./AlerSlace";
import LogUser from "./LogSlice";
import StatusAlertsApi from "./StatusApiAlertSlice";
// import {persistReducer} from "redux-persist"
// import storage from "redux-persist/es/storage";

// const percisterConfig ={
//   key: "transactions",
//   storage
// }aqui na index e na App.tsx

export default combineReducers({
  createNewUser,
  MessagsSlice,
  Alerts,
  StatusAlertsApi,
  LogUser,
});

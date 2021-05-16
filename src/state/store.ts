import contactsReducer from "./contacts-state";
import { combineReducers } from "redux";

combineReducers({
  contacts: contactsReducer,
});

import { contactsReducer, IStateWithContactsSlice } from "./contacts-state";
import { combineReducers, configureStore } from "@reduxjs/toolkit";

interface IState extends IStateWithContactsSlice {}

const rootReducer = combineReducers({
  contactsState: contactsReducer,
});

export const store = configureStore<IState>({
  reducer: rootReducer,
});

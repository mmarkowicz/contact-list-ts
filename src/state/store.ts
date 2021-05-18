import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { contactsReducer } from "./contacts-state";
import { IStateWithContactsSlice } from "./types";

interface IState extends IStateWithContactsSlice {}

const rootReducer = combineReducers({
  contactsState: contactsReducer,
});

export const store = configureStore<IState>({
  reducer: rootReducer,
});

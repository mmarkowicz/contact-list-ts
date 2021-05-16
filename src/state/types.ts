import { IContactsState } from "./contacts-state";

export interface IState {
  contactsState: IContactsState;
}

export enum ContactsFetchStatus {
  Idle = "Idle",
  Pending = "Pending",
  Rejected = "Rejected",
}

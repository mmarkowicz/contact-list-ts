import { IContactsState } from "./contacts-state";

export interface IState {
  contactsState: IContactsState;
}

export enum FetchStatus {
  Idle = "Idle",
  Pending = "Pending",
  Rejected = "Rejected",
}
export interface IContact {
  id: string;
  jobTitle: string;
  emailAddress: string;
  firstNameLastName: string;
}

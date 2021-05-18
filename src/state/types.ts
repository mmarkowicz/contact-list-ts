export interface IContactsState {
  selectedIds: string[];
  contacts: IContact[];
  fetchStatus: FetchStatus;
}

export interface IState {
  contactsState: IContactsState;
}

export interface IStateWithContactsSlice {
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

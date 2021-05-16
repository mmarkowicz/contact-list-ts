import {
  fetchContactsThunk,
  IContact,
  IContactsState,
} from "../contacts-state";
import { ContactsFetchStatus } from "../types";

export const createMockContact = (id: number): IContact => ({
  id: `${id}`,
  emailAddress: `mock-${id}@mock.com`,
  firstNameLastName: `Mock Contact ${id}`,
  jobTitle: `Mock Job ${id}`,
});

export const createInitialState = (
  partial: Partial<IContactsState> = {}
): IContactsState => {
  return {
    selectedIds: [],
    contacts: [],
    fetchStatus: ContactsFetchStatus.Idle,
    ...partial,
  };
};

export const prepareFetchContactsActionCreator =
  (stage: "pending" | "fulfilled" | "rejected") => (payload?: IContact[]) => ({
    type: fetchContactsThunk[stage].type,
    payload,
  });

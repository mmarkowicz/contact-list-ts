import { fetchContactsThunk, IContactsState } from "../contacts-state";
import { FetchStatus, IContact } from "../types";

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
    fetchStatus: FetchStatus.Idle,
    ...partial,
  };
};

export const prepareFetchContactsActionCreator =
  (stage: "pending" | "fulfilled" | "rejected") => (payload?: IContact[]) => ({
    type: fetchContactsThunk[stage].type,
    payload,
  });

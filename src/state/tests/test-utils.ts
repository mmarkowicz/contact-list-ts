import { IContact, IContactsState } from "../contacts-state";

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
    isFetchPending: false,
    isLastFetchRejected: false,
    ...partial,
  };
};

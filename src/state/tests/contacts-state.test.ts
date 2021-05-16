import contactsReducer, {
  contactSelected,
  contactDeselected,
  IContact,
  IContactsState,
  fetchContacts,
} from "../contacts-state";
import { createInitialState, createMockContact } from "./test-utils";

const prepareFetchContactsActionCreator =
  (stage: "pending" | "fulfilled" | "rejected") => (payload?: IContact[]) => ({
    type: fetchContacts[stage].type,
    payload,
  });

describe("Contacts state reducer", () => {
  it("should return the initial state", () => {
    expect(contactsReducer(undefined, { type: undefined })).toEqual(
      createInitialState()
    );
  });

  describe(`when dispatching ${fetchContacts.fulfilled}`, () => {
    const fulfilledFetchContacts =
      prepareFetchContactsActionCreator("fulfilled");

    it("should add new contacts", () => {
      const mockFetchedContacts: IContact[] = [createMockContact(1)];

      expect(
        contactsReducer(undefined, fulfilledFetchContacts(mockFetchedContacts))
      ).toEqual(
        createInitialState({
          contacts: [createMockContact(1)],
        })
      );
    });

    it("should not change contacts collection when dispatched with empty array", () => {
      const testCaseState: IContactsState = createInitialState({
        contacts: [createMockContact(0), createMockContact(1)],
      });

      expect(
        contactsReducer(testCaseState, fulfilledFetchContacts([]))
      ).toEqual(
        createInitialState({
          contacts: [createMockContact(0), createMockContact(1)],
        })
      );
    });

    it("should mark fetching as fulfilled", () => {
      const testCaseState: IContactsState = createInitialState({
        isFetchPending: true,
      });

      expect(
        contactsReducer(testCaseState, fulfilledFetchContacts([]))
      ).toEqual(createInitialState({ isFetchPending: false }));
    });

    it("should add new contacts at the end of the contacts list", () => {
      const testCaseState: IContactsState = createInitialState({
        contacts: [createMockContact(0)],
      });

      const mockFetchedContacts: IContact[] = [createMockContact(1)];

      expect(
        contactsReducer(
          testCaseState,
          fulfilledFetchContacts(mockFetchedContacts)
        )
      ).toEqual(
        createInitialState({
          contacts: [createMockContact(0), createMockContact(1)],
        })
      );
    });
  });

  describe(`when dispatching ${fetchContacts.rejected}`, () => {
    const rejectedFetchContacts = prepareFetchContactsActionCreator("rejected");

    it("should mark fetching as finished and indicate rejection", () => {
      const testCaseState: IContactsState = createInitialState({
        isFetchPending: true,
        isLastFetchRejected: false,
      });

      expect(contactsReducer(testCaseState, rejectedFetchContacts())).toEqual(
        createInitialState({
          isFetchPending: false,
          isLastFetchRejected: true,
        })
      );
    });
  });

  describe(`when dispatching ${fetchContacts.pending}`, () => {
    const pendingFetchContacts = prepareFetchContactsActionCreator("pending");

    it("should mark fetching as pending and clear rejection indication", () => {
      const testCaseState: IContactsState = createInitialState({
        isFetchPending: false,
        isLastFetchRejected: true,
      });

      expect(contactsReducer(testCaseState, pendingFetchContacts())).toEqual(
        createInitialState({
          isFetchPending: true,
          isLastFetchRejected: false,
        })
      );
    });
  });

  describe(`when dispatching ${contactSelected}`, () => {
    it("should add selected id to selected ids array", () => {
      const testCaseState: IContactsState = createInitialState();

      expect(
        contactsReducer(testCaseState, contactSelected("test-id-1"))
      ).toEqual(
        createInitialState({
          selectedIds: ["test-id-1"],
        })
      );
    });

    it("should not replicate id when it's already in selected ids array", () => {
      const testCaseState: IContactsState = createInitialState({
        selectedIds: ["test-id-1"],
      });

      expect(
        contactsReducer(testCaseState, contactSelected("test-id-1"))
      ).toEqual(
        createInitialState({
          selectedIds: ["test-id-1"],
        })
      );
    });
  });

  describe(`when dispatching ${contactDeselected}`, () => {
    it("should remove selected id from selected ids array", () => {
      const testCaseState: IContactsState = createInitialState({
        selectedIds: ["test-id-0", "test-id-1"],
      });

      expect(
        contactsReducer(testCaseState, contactDeselected("test-id-1"))
      ).toEqual(
        createInitialState({
          selectedIds: ["test-id-0"],
        })
      );
    });

    it("should not change selected ids array when trying to remove not existing id", () => {
      const testCaseState: IContactsState = createInitialState({
        selectedIds: ["test-id-1"],
      });

      expect(
        contactsReducer(testCaseState, contactDeselected("test-id-2"))
      ).toEqual(
        createInitialState({
          selectedIds: ["test-id-1"],
        })
      );
    });
  });
});

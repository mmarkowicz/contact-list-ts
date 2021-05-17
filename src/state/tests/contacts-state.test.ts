import {
  contactsReducer,
  contactSelected,
  contactDeselected,
  IContactsState,
  fetchContactsThunk,
} from "../contacts-state";
import { FetchStatus, IContact } from "../types";
import {
  createInitialState,
  createMockContact,
  prepareFetchContactsActionCreator,
} from "./test-utils";

describe("Contacts state reducer", () => {
  it("should return the initial state", () => {
    const resultState = contactsReducer(undefined, { type: undefined });
    expect(resultState).toEqual(createInitialState());
  });

  describe(`when dispatching ${fetchContactsThunk.fulfilled}`, () => {
    const fulfilledFetchContacts =
      prepareFetchContactsActionCreator("fulfilled");

    it("should add new contacts", () => {
      const mockFetchedContacts: IContact[] = [createMockContact(1)];

      const resultState = contactsReducer(
        undefined,
        fulfilledFetchContacts(mockFetchedContacts)
      );

      expect(resultState).toEqual(
        createInitialState({
          contacts: [createMockContact(1)],
        })
      );
    });

    it("should not change contacts collection when dispatched with empty array", () => {
      const testCaseState: IContactsState = createInitialState({
        contacts: [createMockContact(0), createMockContact(1)],
      });

      const resultState = contactsReducer(
        testCaseState,
        fulfilledFetchContacts([])
      );

      expect(resultState).toEqual(
        createInitialState({
          contacts: [createMockContact(0), createMockContact(1)],
        })
      );
    });

    it("should mark fetching status as idle", () => {
      const testCaseState: IContactsState = createInitialState({
        fetchStatus: FetchStatus.Pending,
      });

      const resultState = contactsReducer(
        testCaseState,
        fulfilledFetchContacts([])
      );

      expect(resultState).toEqual(
        createInitialState({ fetchStatus: FetchStatus.Idle })
      );
    });

    it("should add new contacts at the end of the contacts list", () => {
      const testCaseState: IContactsState = createInitialState({
        contacts: [createMockContact(0)],
      });

      const mockFetchedContacts: IContact[] = [createMockContact(1)];

      const resultState = contactsReducer(
        testCaseState,
        fulfilledFetchContacts(mockFetchedContacts)
      );
      expect(resultState).toEqual(
        createInitialState({
          contacts: [createMockContact(0), createMockContact(1)],
        })
      );
    });
  });

  describe(`when dispatching ${fetchContactsThunk.rejected}`, () => {
    const rejectedFetchContacts = prepareFetchContactsActionCreator("rejected");

    it("should mark fetching status as rejected", () => {
      const testCaseState: IContactsState = createInitialState({
        fetchStatus: FetchStatus.Pending,
      });

      const resultState = contactsReducer(
        testCaseState,
        rejectedFetchContacts()
      );

      expect(resultState).toEqual(
        createInitialState({
          fetchStatus: FetchStatus.Rejected,
        })
      );
    });
  });

  describe(`when dispatching ${fetchContactsThunk.pending}`, () => {
    const pendingFetchContacts = prepareFetchContactsActionCreator("pending");

    it("should mark fetching as pending and clear rejection indication", () => {
      const testCaseState: IContactsState = createInitialState({
        fetchStatus: FetchStatus.Idle,
      });

      const resultState = contactsReducer(
        testCaseState,
        pendingFetchContacts()
      );

      expect(resultState).toEqual(
        createInitialState({
          fetchStatus: FetchStatus.Pending,
        })
      );
    });
  });

  describe(`when dispatching ${contactSelected}`, () => {
    it("should add selected id to selected ids array", () => {
      const testCaseState: IContactsState = createInitialState();

      const resultState = contactsReducer(
        testCaseState,
        contactSelected("test-id-1")
      );

      expect(resultState).toEqual(
        createInitialState({
          selectedIds: ["test-id-1"],
        })
      );
    });

    it("should not replicate id when it's already in selected ids array", () => {
      const testCaseState: IContactsState = createInitialState({
        selectedIds: ["test-id-1"],
      });

      const resultState = contactsReducer(
        testCaseState,
        contactSelected("test-id-1")
      );

      expect(resultState).toEqual(
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

      const resultState = contactsReducer(
        testCaseState,
        contactDeselected("test-id-1")
      );

      expect(resultState).toEqual(
        createInitialState({
          selectedIds: ["test-id-0"],
        })
      );
    });

    it("should not change selected ids array when trying to remove not existing id", () => {
      const testCaseState: IContactsState = createInitialState({
        selectedIds: ["test-id-1"],
      });

      const resultState = contactsReducer(
        testCaseState,
        contactDeselected("test-id-2")
      );

      expect(resultState).toEqual(
        createInitialState({
          selectedIds: ["test-id-1"],
        })
      );
    });
  });
});

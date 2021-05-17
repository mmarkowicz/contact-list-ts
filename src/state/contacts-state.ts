import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import apiData from "../api";
import { FetchStatus } from "./types";

export interface IContact {
  id: string;
  jobTitle: string;
  emailAddress: string;
  firstNameLastName: string;
}
export interface IStateWithContactsSlice {
  contactsState: IContactsState;
}

export interface IContactsState {
  selectedIds: string[];
  contacts: IContact[];
  fetchStatus: FetchStatus;
}

const initialState: IContactsState = {
  selectedIds: [],
  contacts: [],
  fetchStatus: FetchStatus.Idle,
};

export const fetchContactsThunk = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    return apiData();
  }
);

const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    contactSelected: (
      state: IContactsState,
      { payload: selectedId }: PayloadAction<string>
    ) => {
      const isAlreadyAdded = state.selectedIds.includes(selectedId);

      if (!isAlreadyAdded) {
        state.selectedIds.push(selectedId);
      }
    },
    contactDeselected: (
      state: IContactsState,
      { payload: selectedId }: PayloadAction<string>
    ) => {
      state.selectedIds = state.selectedIds.filter((id) => id !== selectedId);
    },
  },
  extraReducers: {
    [fetchContactsThunk.pending.type]: (state: IContactsState) => {
      state.fetchStatus = FetchStatus.Pending;
    },
    [fetchContactsThunk.fulfilled.type]: (
      state: IContactsState,
      { payload: newContacts }: PayloadAction<IContact[]>
    ) => {
      state.contacts = state.contacts.concat(newContacts);
      state.fetchStatus = FetchStatus.Idle;
    },
    [fetchContactsThunk.rejected.type]: (state: IContactsState) => {
      state.fetchStatus = FetchStatus.Rejected;
    },
  },
});

export const { contactSelected, contactDeselected } = slice.actions;

export const contactsReducer = slice.reducer;

export const selectContacts = ({
  contactsState,
}: IStateWithContactsSlice): IContact[] => contactsState.contacts;

export const selectSelectedIds = ({
  contactsState,
}: IStateWithContactsSlice): string[] => contactsState.selectedIds;

export const selectFetchStatus = ({
  contactsState,
}: IStateWithContactsSlice): FetchStatus => contactsState.fetchStatus;

interface IContactsSelection {
  selectedContacts: IContact[];
  unselectedContacts: IContact[];
}

export const contactsSelectorCombiner = (
  contacts: IContact[],
  selectedIds: string[]
): IContactsSelection => {
  const selectedIdsSet = new Set(selectedIds);

  const selectedContacts = contacts.filter(({ id }) => selectedIdsSet.has(id));
  const unselectedContacts = contacts.filter(
    ({ id }) => !selectedIdsSet.has(id)
  );

  return {
    selectedContacts,
    unselectedContacts,
  };
};

export const contactsSelector = createSelector(
  selectContacts,
  selectSelectedIds,
  contactsSelectorCombiner
);

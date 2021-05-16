import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import apiData from "../api";

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
  isFetchPending: boolean;
  isLastFetchRejected: boolean;
}

const initialState: IContactsState = {
  selectedIds: [],
  contacts: [],
  isFetchPending: false,
  isLastFetchRejected: false,
};

export const fetchContacts = createAsyncThunk(
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
    [fetchContacts.pending.type]: (state: IContactsState) => {
      state.isFetchPending = true;
      state.isLastFetchRejected = false;
    },
    [fetchContacts.fulfilled.type]: (
      state: IContactsState,
      { payload: newContacts }: PayloadAction<IContact[]>
    ) => {
      state.contacts = state.contacts.concat(newContacts);
      state.isFetchPending = false;
    },
    [fetchContacts.rejected.type]: (state: IContactsState) => {
      state.isFetchPending = false;
      state.isLastFetchRejected = true;
    },
  },
});

export const { contactSelected, contactDeselected } = slice.actions;

export default slice.reducer;

interface IContactsSelection {
  selectedContacts: IContact[];
  unselectedContacts: IContact[];
}

export const contactsStateGetter = ({
  contactsState,
}: IStateWithContactsSlice): IContact[] => contactsState.contacts;

export const selectedIdsStateGetter = ({
  contactsState,
}: IStateWithContactsSlice): string[] => contactsState.selectedIds;

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
  contactsStateGetter,
  selectedIdsStateGetter,
  contactsSelectorCombiner
);

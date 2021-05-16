import { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchContactsThunk,
  selectFetchStatus,
} from "src/state/contacts-state";

export const useContactsFetch = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectFetchStatus);
  const fetchContacts = useCallback(() => {
    dispatch(fetchContactsThunk());
  }, [dispatch]);

  return {
    status,
    fetchContacts,
  };
};

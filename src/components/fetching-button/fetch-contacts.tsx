import React from "react";
import { useContactsFetch } from "./use-fetch-status";
import FetchStatusButton from "./fetch-status-button";

const FetchContacts = () => {
  const { fetchContacts, status } = useContactsFetch();

  return <FetchStatusButton status={status} onClick={fetchContacts} />;
};

export default FetchContacts;

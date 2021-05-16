import React from "react";

import { ContactsFetchStatus } from "src/state/types";

import { useContactsFetch } from "./use-fetch-status";
import { Button } from "./styles";

const text: {
  [key in ContactsFetchStatus]: string;
} = {
  [ContactsFetchStatus.Idle]: "Load more",
  [ContactsFetchStatus.Pending]: "Loading...",
  [ContactsFetchStatus.Rejected]: "Error! Retry?",
};

export default function FetchingButton() {
  const { fetchContacts, status } = useContactsFetch();

  return (
    <Button status={status} onClick={fetchContacts}>
      {text[status]}
    </Button>
  );
}

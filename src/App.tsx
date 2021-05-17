import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { contactsSelector } from "./state/contacts-state";
import ContactsList from "./components/contacts-list/contacts-list";
import FetchContacts from "./components/fetching-button/fetch-contacts";

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 0 20px;
`;

const SelectedSection = styled.div`
  color: #333333;
  font-size: 26px;
  font-weight: 700;
  margin: 10px 0 20px;
`;

function App() {
  const { selectedContacts } = useSelector(contactsSelector);

  return (
    <AppWrapper>
      <SelectedSection>
        Selected contacts: {selectedContacts.length}
      </SelectedSection>
      <ContactsList />
      <FetchContacts />
    </AppWrapper>
  );
}

export default App;

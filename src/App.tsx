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
  justify-content: center;
  flex-direction: column;
  padding: 0 20px;
`;

const SelectedSection = styled.div`
  color: #333333;
  font-size: 26px;
  font-weight: 700;
  margin: 10px 0 20px;
`;

const ContactsSection = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-bottom: 10px;
  overflow-y: auto;
`;

function App() {
  const { selectedContacts } = useSelector(contactsSelector);

  return (
    <AppWrapper>
      <SelectedSection>
        Selected contacts: {selectedContacts.length}
      </SelectedSection>
      <ContactsSection>
        <ContactsList />
        <FetchContacts />
      </ContactsSection>
    </AppWrapper>
  );
}

export default App;

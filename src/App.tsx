import React from "react";
import { useSelector } from "react-redux";
import { contactsSelector } from "./state/contacts-state";
import ContactsList from "./components/contacts-list/contacts-list";
import styled from "styled-components";

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
`;

const SelectedSection = styled.div`
  color: #333333;
  font-size: 26px;
  font-weight: 700;
  margin: 10px 20px 0 0;
`;

const ListSection = styled.div`
  flex-grow: 1;
`;

function App() {
  const { selectedContacts } = useSelector(contactsSelector);

  return (
    <AppWrapper>
      <SelectedSection>
        Selected contacts: {selectedContacts.length}
      </SelectedSection>
      <ListSection>
        <ContactsList />
      </ListSection>
    </AppWrapper>
  );
}

export default App;

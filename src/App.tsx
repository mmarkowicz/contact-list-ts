import React from "react";
import { useSelector } from "react-redux";
import { contactsSelector } from "./state/contacts-state";
import FetchContacts from "./components/fetching-button/fetch-contacts";
import ContactsList from "./components/contacts-list/contacts-list";

function App() {
  const { selectedContacts } = useSelector(contactsSelector);

  return (
    <div className="App">
      <div className="selected">
        Selected contacts: {selectedContacts.length}
      </div>
      <ContactsList />
      <FetchContacts />
    </div>
  );
}

export default App;

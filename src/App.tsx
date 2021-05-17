import React from "react";
import FetchContacts from "./components/fetching-button/fetch-contacts";
import PersonInfo from "./PersonInfo";
import { useSelector } from "react-redux";
import { contactsSelector } from "./state/contacts-state";

function App() {
  const { selectedContacts, unselectedContacts } =
    useSelector(contactsSelector);

  return (
    <div className="App">
      <div className="selected">
        Selected contacts: {selectedContacts.length}
      </div>
      <div className="list">
        {selectedContacts.map((personInfo) => (
          // @ts-ignore
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
        {unselectedContacts.map((personInfo) => (
          // @ts-ignore
          <PersonInfo key={personInfo.id} data={personInfo} />
        ))}
      </div>
      <FetchContacts />
    </div>
  );
}

export default App;

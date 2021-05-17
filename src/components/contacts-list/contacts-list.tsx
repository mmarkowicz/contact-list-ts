import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  contactDeselected,
  contactSelected,
  contactsSelector,
} from "src/state/contacts-state";
import ContactInformation from "../contact-information/contact-information";

const ContactsList = () => {
  const dispatch = useDispatch();
  const { selectedContacts, unselectedContacts } =
    useSelector(contactsSelector);

  const select = useCallback(
    (id: string) => dispatch(contactSelected(id)),
    [dispatch]
  );

  const deselect = useCallback(
    (id: string) => dispatch(contactDeselected(id)),
    [dispatch]
  );

  return (
    <div>
      {selectedContacts.map((contact) => (
        <ContactInformation
          key={contact.id}
          contact={contact}
          isSelected
          onClick={deselect}
        />
      ))}
      {unselectedContacts.map((contact) => (
        <ContactInformation
          key={contact.id}
          contact={contact}
          onClick={select}
        />
      ))}
    </div>
  );
};

export default ContactsList;

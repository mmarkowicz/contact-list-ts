import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import {
  contactDeselected,
  contactSelected,
  contactsSelector,
} from "src/state/contacts-state";
import ContactInformation from "../contact-information/contact-information";
import FetchContacts from "../fetching-button/fetch-contacts";
import styled from "styled-components";

const ITEM_HEIGHT = 110;

const ItemWrapper = styled.div`
  height: {ITEM_HEIGHT}px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContactsList = () => {
  const dispatch = useDispatch();
  const { selectedContacts, unselectedContacts } =
    useSelector(contactsSelector);

  const select = (id: string) => dispatch(contactSelected(id));

  const deselect = (id: string) => dispatch(contactDeselected(id));

  const allListItems = [
    ...selectedContacts.map((contact) => (
      <ContactInformation
        key={contact.id}
        contact={contact}
        isSelected
        onClick={deselect}
      />
    )),
    ...unselectedContacts.map((contact) => (
      <ContactInformation key={contact.id} contact={contact} onClick={select} />
    )),
    <FetchContacts />,
  ];

  return (
    <AutoSizer>
      {({ height, width }) => (
        <List
          itemCount={allListItems.length}
          itemSize={ITEM_HEIGHT}
          width={width}
          height={height}>
          {({ index, style }) => {
            return (
              <ItemWrapper style={style}>{allListItems[index]}</ItemWrapper>
            );
          }}
        </List>
      )}
    </AutoSizer>
  );
};

export default ContactsList;

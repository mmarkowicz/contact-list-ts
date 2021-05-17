import React from "react";
import styled from "styled-components";
import { IContact } from "src/state/types";
import { Name, JobTitle, EmailAddress } from "./card-items";

type WrapperConfig = {
  isSelected: boolean;
};

export const Wrapper = styled.div<WrapperConfig>`
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  border: 2px solid ${({ isSelected }) => (isSelected ? "#3498db" : "#fff")};
  background: #fff;
  cursor: pointer;

  &:hover {
    border: 2px solid pink;
  }
`;

type Props = {
  isSelected?: boolean;
  contact: IContact;
  onClick: (id: string) => void;
};

function ContactInformation({
  isSelected = false,
  contact: { id, firstNameLastName, jobTitle, emailAddress },
  onClick,
}: Props) {
  const handleClick = () => onClick(id);

  return (
    <Wrapper isSelected={isSelected} onClick={handleClick}>
      <Name>{firstNameLastName}</Name>
      <JobTitle>{jobTitle}</JobTitle>
      <EmailAddress>{emailAddress}</EmailAddress>
    </Wrapper>
  );
}

export default ContactInformation;

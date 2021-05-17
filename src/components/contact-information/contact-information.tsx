import React from "react";
import styled from "styled-components";
import { IContact } from "src/state/types";

type WrapperConfig = {
  isSelected: boolean;
};

export const Wrapper = styled.div<WrapperConfig>`
  display: flex;
  height: 100px;
  justify-content: center;
  flex-direction: column;
  padding: 32px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.15);
  border: 2px solid ${({ isSelected }) => (isSelected ? "blue" : "white")};
  margin: 10px 0;
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
      <div className="firstNameLastName">{firstNameLastName}</div>
      <div className="jobTitle">{jobTitle}</div>
      <div className="emailAddress">{emailAddress}</div>
    </Wrapper>
  );
}

export default React.memo(ContactInformation);

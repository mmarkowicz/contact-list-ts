import { ContactsFetchStatus } from "src/state/types";
import styled from "styled-components";

type ButtonProps = {
  status: ContactsFetchStatus;
};

const statusColor = {
  [ContactsFetchStatus.Pending]: "#2980b9",
  [ContactsFetchStatus.Idle]: "#16a085",
  [ContactsFetchStatus.Rejected]: "#c0392b",
};

export const Button = styled.button<ButtonProps>`
  border: 3px solid ${({ status }) => statusColor[status]};
  border-radius: 4px;
  background-color: white;
  color: ${({ status }) => statusColor[status]};
  padding: 8px;
  font: inherit;
  outline: none;
`;

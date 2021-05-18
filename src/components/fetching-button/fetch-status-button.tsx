import React from "react";
import styled from "styled-components";
import { FetchStatus } from "src/state/types";

export const PENDING_LABEL = "Loading...";
export const PENDING_COLOR = "#2980b9";
export const IDLE_LABEL = "Load more";
export const IDLE_COLOR = "#16a085";
export const ERROR_LABEL = "Error occurred. Click to retry?";
export const ERROR_COLOR = "#c0392b";

type ButtonConfig = {
  label: string;
  mainColor: string;
};

const buttonConfigs: { [status in FetchStatus]: ButtonConfig } = {
  [FetchStatus.Pending]: {
    label: PENDING_LABEL,
    mainColor: PENDING_COLOR,
  },
  [FetchStatus.Idle]: { label: IDLE_LABEL, mainColor: IDLE_COLOR },
  [FetchStatus.Rejected]: {
    label: ERROR_LABEL,
    mainColor: ERROR_COLOR,
  },
};

export const Button = styled(({ color, ...rest }) => <button {...rest} />)<{
  color: string;
  disabled?: boolean;
}>`
  flex-shrink: 0;
  padding: 8px;
  cursor: ${({ disabled }) => (disabled ? "wait" : "pointer")};
  border: 3px solid ${({ color }) => color};
  border-radius: 4px;
  background-color: white;
  color: ${({ color }) => color};
  font: inherit;
  outline: none;
`;

type Props = {
  status: FetchStatus;
  onClick: () => void;
};

const FetchStatusButton = ({ status, onClick }: Props) => {
  const { mainColor, label } = buttonConfigs[status];

  const disabled = status === FetchStatus.Pending;

  return (
    <Button color={mainColor} onClick={onClick} disabled={disabled}>
      {label}
    </Button>
  );
};

export default FetchStatusButton;

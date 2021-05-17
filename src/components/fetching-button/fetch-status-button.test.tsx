import React from "react";
import FetchStatusButton, {
  ERROR_COLOR,
  ERROR_LABEL,
  IDLE_COLOR,
  IDLE_LABEL,
  PENDING_COLOR,
  PENDING_LABEL,
} from "./fetch-status-button";
import { render, screen } from "@testing-library/react";
import { FetchStatus } from "src/state/types";

describe("Status Button", () => {
  it("should render", () => {
    render(
      <FetchStatusButton
        status={FetchStatus.Rejected}
        onClick={() => undefined}
      />
    );

    expect(screen.queryByRole("button")).not.toBeNull();
  });

  it("should render correct label based on status", () => {
    const { rerender } = render(
      <FetchStatusButton status={FetchStatus.Idle} onClick={() => undefined} />
    );
    const idleButton = screen.queryByRole("button", { name: IDLE_LABEL });
    expect(idleButton).not.toBeNull();

    rerender(
      <FetchStatusButton
        status={FetchStatus.Pending}
        onClick={() => undefined}
      />
    );
    const pendingButton = screen.queryByRole("button", { name: PENDING_LABEL });
    expect(pendingButton).not.toBeNull();

    rerender(
      <FetchStatusButton
        status={FetchStatus.Rejected}
        onClick={() => undefined}
      />
    );
    const errorButton = screen.queryByRole("button", { name: ERROR_LABEL });
    expect(errorButton).not.toBeNull();
  });

  it("should display correct colors based on status", () => {
    const { rerender } = render(
      <FetchStatusButton status={FetchStatus.Idle} onClick={() => undefined} />
    );
    const button = screen.getByRole("button");

    expect(button).toHaveStyle(`color: ${IDLE_COLOR}`);
    expect(button).toHaveStyle(`border-color: ${IDLE_COLOR}`);

    rerender(
      <FetchStatusButton
        status={FetchStatus.Rejected}
        onClick={() => undefined}
      />
    );
    expect(button).toHaveStyle(`color: ${ERROR_COLOR}`);
    expect(button).toHaveStyle(`border-color: ${ERROR_COLOR}`);

    rerender(
      <FetchStatusButton
        status={FetchStatus.Pending}
        onClick={() => undefined}
      />
    );
    expect(button).toHaveStyle(`color: ${PENDING_COLOR}`);
    expect(button).toHaveStyle(`border-color: ${PENDING_COLOR}`);
  });

  it("should call onClick handler in rejected and idle status", () => {
    const handler = jest.fn();
    const { rerender } = render(
      <FetchStatusButton status={FetchStatus.Idle} onClick={handler} />
    );

    const button = screen.getByRole("button");
    button.click();
    expect(handler).toHaveBeenCalledTimes(1);

    rerender(
      <FetchStatusButton status={FetchStatus.Rejected} onClick={handler} />
    );
    button.click();
    expect(handler).toHaveBeenCalledTimes(2);
  });

  it("should be disabled during pending status ", () => {
    const handler = jest.fn();
    render(
      <FetchStatusButton status={FetchStatus.Pending} onClick={handler} />
    );

    const button = screen.getByRole("button");
    button.click();
    const disabledAttr = button.getAttribute("disabled");

    expect(handler).not.toHaveBeenCalled();
    expect(disabledAttr).not.toBeNull();
  });
});

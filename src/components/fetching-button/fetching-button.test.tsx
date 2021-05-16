import React from "react";
import { render, screen } from "@testing-library/react";
import FetchingButton from "./fetching-button";

jest.mock("./use-fetch-status", () => ({
  useContactsFetch: jest.fn(),
}));

import { useContactsFetch } from "./use-fetch-status";

describe("When using FetchingButton", () => {
  it("should display 'Load more' text by default", () => {
    useContactsFetch.mockImplementation;

    render(<FetchingButton />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Load more");
  });

  it("should display 'error' text when fetching failed", () => {
    const spy = jest.fn();

    render(<FetchingButton />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Load more");
  });

  it("should display 'pending' text during fetching data", () => {
    const spy = jest.fn();

    render(<FetchingButton />);

    const button = screen.getByRole("button");

    expect(button).toHaveTextContent("Load more");
  });
});

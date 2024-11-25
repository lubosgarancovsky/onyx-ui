import React from "react";
import { Button } from "../src/components";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { PlaceholderIcon } from "../src/icons";

describe("Button", () => {
  it("Button renders on screen", () => {
    render(<Button />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  it("Button click event is fired", () => {
    const fn = jest.fn();
    render(<Button onClick={fn} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("Button click event is not fired for disabled button", () => {
    const fn = jest.fn();
    render(<Button isDisabled onClick={fn} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(fn).not.toHaveBeenCalled();
  });

  it("Loader is displayed", () => {
    render(<Button isLoading />);
    const button = screen.getByRole("button");
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });

  it("Left icon is rendered", () => {
    render(<Button leftIcon={<PlaceholderIcon data-testid="left-icon" />} />);
    const icon = screen.getByTestId("left-icon");
    expect(icon).toBeInTheDocument();
  });

  it("Right icon is rendered", () => {
    render(<Button rightIcon={<PlaceholderIcon data-testid="right-icon" />} />);
    const icon = screen.getByTestId("right-icon");
    expect(icon).toBeInTheDocument();
  });

  it("Right size is applied", () => {
    const { rerender } = render(<Button size="sm" isIconOnly />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("p-1.5");

    rerender(<Button size="md" isIconOnly />);
    expect(button).toHaveClass("p-2.5");

    rerender(<Button size="lg" isIconOnly />);
    expect(button).toHaveClass("p-3.5");
  });
});

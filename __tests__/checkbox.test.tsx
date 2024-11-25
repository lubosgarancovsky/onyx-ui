import React from "react";
import { Checkbox } from "../src/components";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Checkbox", () => {
  it("Checkbox renders on screen", () => {
    render(<Checkbox />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("Checkbox is initially checked", () => {
    render(<Checkbox initiallyChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("Checkbox is initially checked based on isChecked prop", () => {
    render(<Checkbox isChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("Checkbox changes state after being clicked", () => {
    render(<Checkbox isChecked />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
  });

  it("Checkbox changes state based on isChecked prop", () => {
    const { rerender } = render(<Checkbox isChecked={false} />);
    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).not.toBeChecked();

    rerender(<Checkbox isChecked={true} />);
    expect(checkbox).toBeChecked();

    rerender(<Checkbox isChecked={false} />);
    expect(checkbox).not.toBeChecked();
  });

  it("Checkbox onChange callback is called", () => {
    const onChange = jest.fn();
    render(<Checkbox onChange={onChange} />);
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(onChange).toHaveBeenCalled();
  });

  it("Asterix is rendered for required input", () => {
    render(<Checkbox required label="Email" />);
    const asterix = screen.getByText("*");
    expect(asterix).toBeInTheDocument();
  });

  it("Optional text is rendered", () => {
    render(<Checkbox label="Email" optionalText="Optional" />);
    const optional = screen.getByText("Optional");
    expect(optional).toBeInTheDocument();
  });

  it("Asterix is not rendered for required input if disabled", () => {
    render(<Checkbox label="Email" required hideAsterix />);
    const asterix = screen.queryByText("*");
    expect(asterix).toBeNull();
  });

  it("Error message is rendered", () => {
    render(<Checkbox label="Email" error="Invalid input" />);
    const err = screen.getByText("Invalid input");
    expect(err).toBeInTheDocument();
  });
});

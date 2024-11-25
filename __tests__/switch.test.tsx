import React from "react";
import { Switch } from "../src/components";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("Switch", () => {
  it("Switch renders on screen", () => {
    render(<Switch />);
    const swtichBtn = screen.getByRole("checkbox");
    expect(swtichBtn).toBeInTheDocument();
  });

  it("Switch is initially checked", () => {
    render(<Switch initiallyChecked />);
    const swtichBtn = screen.getByRole("checkbox");
    expect(swtichBtn).toBeChecked();
  });

  it("Switch is initially checked based on isChecked prop", () => {
    render(<Switch isChecked />);
    const swtichBtn = screen.getByRole("checkbox");
    expect(swtichBtn).toBeChecked();
  });

  it("Switch changes state after being clicked", () => {
    render(<Switch isChecked />);
    const swtichBtn = screen.getByRole("checkbox");
    expect(swtichBtn).toBeChecked();
    fireEvent.click(swtichBtn);
    expect(swtichBtn).not.toBeChecked();
    fireEvent.click(swtichBtn);
    expect(swtichBtn).toBeChecked();
  });

  it("Switch changes state based on isChecked prop", () => {
    const { rerender } = render(<Switch isChecked={false} />);
    const swtichBtn = screen.getByRole("checkbox");

    expect(swtichBtn).not.toBeChecked();

    rerender(<Switch isChecked={true} />);
    expect(swtichBtn).toBeChecked();

    rerender(<Switch isChecked={false} />);
    expect(swtichBtn).not.toBeChecked();
  });

  it("Switch onChange callback is called", () => {
    const onChange = jest.fn();
    render(<Switch onChange={onChange} />);
    const swtichBtn = screen.getByRole("checkbox");
    fireEvent.click(swtichBtn);
    expect(onChange).toHaveBeenCalled();
  });

  it("Asterix is rendered for required input", () => {
    render(<Switch required label="Email" />);
    const asterix = screen.getByText("*");
    expect(asterix).toBeInTheDocument();
  });

  it("Optional text is rendered", () => {
    render(<Switch label="Email" optionalText="Optional" />);
    const optional = screen.getByText("Optional");
    expect(optional).toBeInTheDocument();
  });

  it("Asterix is not rendered for required input if disabled", () => {
    render(<Switch label="Email" required hideAsterix />);
    const asterix = screen.queryByText("*");
    expect(asterix).toBeNull();
  });

  it("Error message is rendered", () => {
    render(<Switch label="Email" error="Invalid input" />);
    const err = screen.getByText("Invalid input");
    expect(err).toBeInTheDocument();
  });
});

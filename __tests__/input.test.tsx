import React from "react";
import { Input } from "../src/components";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { ClearIcon } from "../src/icons/action";

describe("Input", () => {
  it("Input renders on screen", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    expect(input).toBeInTheDocument();
  });

  it("Input renders on screen", () => {
    render(<Input />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello, World!" } });
    expect(input).toHaveValue("Hello, World!");
  });

  it("Clears input corretly", () => {
    render(<Input isClearable />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello, World!" } });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(input).toHaveValue("");
  });

  it("onChange event is triggered", () => {
    const onChange = jest.fn();
    render(<Input onChange={onChange} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello, World!" } });
    expect(onChange).toHaveBeenCalled();
  });

  it("onClear event is triggered", () => {
    const onClear = jest.fn();
    render(<Input isClearable onClear={onClear} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello, World!" } });
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(onClear).toHaveBeenCalled();
  });

  it("Label gets rendered", () => {
    render(<Input label="Email" />);
    const label = screen.getByText("Email");
    expect(label).toBeInTheDocument();
  });

  it("Error gets rendered", () => {
    render(<Input error="Invalid input" />);
    const error = screen.getByText("Invalid input");
    expect(error).toBeInTheDocument();
  });

  it("Clear icon gets rendered", () => {
    render(
      <Input isClearable clearIcon={<ClearIcon data-testid="clear-icon" />} />
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello, World!" } });
    const icon = screen.getByTestId("clear-icon");
    expect(icon).toBeInTheDocument();
  });

  it("Clear icon is hides after input is cleared", () => {
    render(
      <Input isClearable clearIcon={<ClearIcon data-testid="clear-icon" />} />
    );
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello, World!" } });
    const button = screen.getByRole("button");
    const icon = screen.getByTestId("clear-icon");
    fireEvent.click(button);
    expect(icon).not.toBeInTheDocument();
  });

  it("Asterix is rendered for required input", () => {
    render(<Input required label="Email" />);
    const asterix = screen.getByText("*");
    expect(asterix).toBeInTheDocument();
  });

  it("Optional text is rendered", () => {
    render(<Input label="Email" optionalText="Optional" />);
    const optional = screen.getByText("Optional");
    expect(optional).toBeInTheDocument();
  });

  it("Asterix is not rendered for required input if disabled", () => {
    render(<Input label="Email" required hideAsterix />);
    const asterix = screen.queryByText("*");
    expect(asterix).toBeNull();
  });

  it("Error message is rendered", () => {
    render(<Input label="Email" error="Invalid input" />);
    const err = screen.getByText("Invalid input");
    expect(err).toBeInTheDocument();
  });
});

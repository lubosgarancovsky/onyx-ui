import React from "react";
import { Button, ButtonGroup } from "../src/components";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

describe("ButtonGroup", () => {
  it("ButtonGroup renders on the screen", () => {
    render(
      <ButtonGroup>
        <Button>Test</Button>
        <Button>Test</Button>
      </ButtonGroup>
    );
    const group = screen.getByTestId("button-group");
    expect(group).toBeInTheDocument();
  });

  it("All ButtonGroup children render on the screen", () => {
    render(
      <ButtonGroup>
        <Button>Test1</Button>
        <Button>Test2</Button>
      </ButtonGroup>
    );
    const button1 = screen.getByText("Test1");
    const button2 = screen.getByText("Test2");
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
  });
});

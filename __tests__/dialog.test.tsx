import React, { act } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogBody,
  Button,
} from "../src/components";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe("Dialog", () => {
  it("Dialog content renders on screen when trigger is clicked", () => {
    render(
      <Dialog>
        <DialogTrigger>
          <Button>Open</Button>
        </DialogTrigger>
        <DialogBody>
          <DialogContent>
            <div>Content</div>
          </DialogContent>
        </DialogBody>
      </Dialog>
    );
    const button = screen.getByText("Open");
    fireEvent.click(button);

    const content = screen.getByText("Content");
    expect(content).toBeInTheDocument();
  });

  it("Dialog is opened by isOpen prop", () => {
    render(
      <Dialog isOpen>
        <DialogBody>
          <DialogContent>
            <div>Content</div>
          </DialogContent>
        </DialogBody>
      </Dialog>
    );

    const content = screen.getByText("Content");
    expect(content).toBeInTheDocument();
  });

  it("Dialog is closed with X button", async () => {
    render(
      <Dialog isOpen>
        <DialogBody>
          <DialogContent>Content</DialogContent>
        </DialogBody>
      </Dialog>
    );

    const content = screen.getByText("Content");
    const button = screen.getByTestId("dialog-close-button");
    act(() => {
      fireEvent.click(button);
    });

    await wait(310); //wait for exit animation to finish
    expect(content).not.toBeInTheDocument();
  });

  it("Dialog throws error without context", () => {
    expect(() =>
      render(
        <>
          <DialogTrigger>
            <Button>Open</Button>
          </DialogTrigger>
          <DialogBody>
            <DialogContent>
              <div>Content</div>
            </DialogContent>
          </DialogBody>
        </>
      )
    ).toThrow();
  });

  it("Trigger onClick is called and opens dialog", () => {
    const onClick = jest.fn();

    render(
      <Dialog>
        <DialogTrigger>
          <Button onClick={onClick}>Open</Button>
        </DialogTrigger>
        <DialogBody>
          <DialogContent>
            <div>Content</div>
          </DialogContent>
        </DialogBody>
      </Dialog>
    );

    const button = screen.getByText("Open");
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalled();
    const content = screen.getByText("Content");
    expect(content).toBeInTheDocument();
  });
});

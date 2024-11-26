import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogContent,
  DialogTrigger,
  Input,
} from "../../src/components";
const meta = {
  title: "Core/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    heading: "Sign up",
    description: "Create your account and start using the app.",
    children: (
      <>
        <DialogTrigger>
          <Button color="primary">Open dialog</Button>
        </DialogTrigger>
        <DialogBody>
          <DialogContent className="flex flex-col gap-4">
            {(setIsOpen) => <>
              <Input
                  type="email"
                  label="E-mail"
                  placeholder="Enter your e-mail"
              />
              <Input type="password" label="Password" />
              <Input type="password" label="Repeat password" />
              <Checkbox label="I agree with terms & conditions" />

              <div className="flex justify-end gap-2">
                <Button onClick={() => setIsOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsOpen(false)} color="primary">Submit</Button>
              </div>
            </>}
          </DialogContent>
        </DialogBody>
      </>
    ),
  },
};

export const ManuallyControlled: Story = {
  args: {
    heading: "Sign up",
    description: "Create your account and start using the app.",
    isOpen: true,
    children: (
      <>
        <DialogBody>
          <DialogContent className="flex flex-col gap-4">
            <Input
              type="email"
              label="E-mail"
              placeholder="Enter your e-mail"
            />
            <Input type="password" label="Password" />
            <Input type="password" label="Repeat password" />
          </DialogContent>
        </DialogBody>
      </>
    ),
  },
};

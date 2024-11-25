import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button, ButtonGroup } from "../../src/components";
import { PlaceholderIcon } from "../../src/icons";
import { DropdownIcon } from "../../src/icons/navigation";

const meta = {
  title: "Core/ButtonGroup",
  component: ButtonGroup,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  //   argTypes: {
  //     backgroundColor: { control: "color" },
  //   },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: [
      <Button color="primary" leftIcon={<PlaceholderIcon />}>
        Open file
      </Button>,
      <Button color="primary" isIconOnly>
        <DropdownIcon />
      </Button>,
    ],
  },
};

export const Default: Story = {
  args: {
    children: [
      <Button leftIcon={<PlaceholderIcon />}>Open file</Button>,
      <Button isIconOnly>
        <DropdownIcon />
      </Button>,
    ],
  },
};

export const Danger: Story = {
  args: {
    children: [
      <Button color="danger" leftIcon={<PlaceholderIcon />}>
        Delete file
      </Button>,
      <Button color="danger" isIconOnly>
        <DropdownIcon />
      </Button>,
    ],
  },
};

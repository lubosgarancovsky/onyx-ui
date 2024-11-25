import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "../../src/components";
import { PlaceholderIcon } from "../../src/icons";

const meta = {
  title: "Core/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  args: { onChange: (value) => console.log(value) },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: "Enter text...",
    className: "w-[24rem]",
    options: ["red", "green", "blue"],
  },
};

export const Labeled: Story = {
  args: {
    leftIcon: <PlaceholderIcon />,
    label: "Pick color",
    placeholder: "Pick a color...",
    options: [
      {
        id: 1,
        value: "Violet",
      },
      {
        id: 2,
        value: "Rose",
      },
      {
        id: 3,
        value: "Teal",
      },
    ],
    getOptionLabel: (option) => option.value,
    className: "w-[24rem]",
  },
};

export const Error: Story = {
  args: {
    leftIcon: <PlaceholderIcon />,
    label: "Pick color",
    placeholder: "Enter text...",
    required: true,
    error: "This input is mandatory",
    options: ["red", "green", "blue"],
    className: "w-[24rem]",
  },
};

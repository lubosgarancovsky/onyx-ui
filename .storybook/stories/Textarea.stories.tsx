import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "../../src/components";
import { PlaceholderIcon } from "../../src/icons";
import { SearchIcon } from "../../src/icons/action";

const meta = {
  title: "Core/Textarea",
  component: Textarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  args: { onChange: (e) => console.log(e.target.value) },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: "Enter text...",
    rows: 8,
    className: "min-w-[24rem]",
  },
};

export const Labeled: Story = {
  args: {
    label: "Description",
    placeholder: "Enter text...",
    rows: 8,
    className: "min-w-[24rem]",
  },
};

export const Prefilled: Story = {
  args: {
    label: "Description",
    placeholder: "Enter text...",
    rows: 8,
    className: "min-w-[24rem]",
    value:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  },
};

export const Required: Story = {
  args: {
    label: "Description",
    placeholder: "Enter text...",
    required: true,
    rows: 8,
    className: "min-w-[24rem]",
  },
};

export const Optional: Story = {
  args: {
    label: "Description",
    placeholder: "Enter text...",
    optionalText: "(Optional)",
    rows: 8,
    className: "min-w-[24rem]",
  },
};

export const Error: Story = {
  args: {
    label: "Description",
    placeholder: "Enter text...",
    error: "Input is invalid",
    rows: 8,
    className: "min-w-[24rem]",
  },
};

export const Disabled: Story = {
  args: {
    label: "Description",
    placeholder: "Enter text...",
    isDisabled: true,
    rows: 8,
    className: "min-w-[24rem]",
  },
};

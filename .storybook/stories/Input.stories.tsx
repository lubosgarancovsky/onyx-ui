import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "../../src/components";
import { PlaceholderIcon } from "../../src/icons";
import { SearchIcon } from "../../src/icons/action";

const meta = {
  title: "Core/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  args: { onChange: (e) => console.log(e.target.value) },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: "Enter text...",
  },
};

export const Labeled: Story = {
  args: {
    label: "E-mail address",
    placeholder: "Enter your email...",
  },
};

export const Required: Story = {
  args: {
    label: "E-mail address",
    placeholder: "Enter your email...",
    required: true,
  },
};

export const Optional: Story = {
  args: {
    label: "E-mail address",
    placeholder: "Enter your email...",
    optionalText: "(Optional)",
  },
};

export const Clearable: Story = {
  args: {
    leftIcon: <SearchIcon />,
    placeholder: "Enter text...",
    debounce: 500,
    isClearable: true,
  },
};

export const Error: Story = {
  args: {
    placeholder: "Enter text...",
    error: "Input is invalid",
  },
};

export const Disabled: Story = {
  args: {
    label: "E-mail address",
    placeholder: "Enter your email...",
    isDisabled: true,
  },
};

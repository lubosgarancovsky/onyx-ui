import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Switch } from "../../src/components";
import { PlaceholderIcon } from "../../src/icons";
import { SearchIcon } from "../../src/icons/action";

const meta = {
  title: "Core/Switch",
  component: Switch,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  args: { onChange: (e) => console.log(e.target.value) },
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Labeled: Story = {
  args: { label: "Subscribe to newsletter" },
};

export const LeftLabeled: Story = {
  args: { label: "Subscribe to newsletter", labelPosition: "left" },
};

export const Required: Story = {
  args: { label: "Subscribe to newsletter", required: true },
};

export const Optional: Story = {
  args: { label: "Subscribe to newsletter", optionalText: "(Optional)" },
};

export const Error: Story = {
  args: {
    label: "I agree with terms & conditions",
    required: true,
    error: "You have to agree with terms & conditions to continue.",
  },
};

export const Disabled: Story = {
  args: {
    label: "Subscribe to newsletter",
    required: true,
    isDisabled: true,
    isChecked: true,
  },
};

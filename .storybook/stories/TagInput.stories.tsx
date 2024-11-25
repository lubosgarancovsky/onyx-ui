import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { TagInput } from "../../src/components";
import { PlaceholderIcon } from "../../src/icons";
import { SearchIcon } from "../../src/icons/action";

const meta = {
  title: "Core/TagInput",
  component: TagInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onChange: (e) => console.log(e.target.value) },
} satisfies Meta<typeof TagInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    placeholder: "Add tag...",
  },
};

export const Labeled: Story = {
  args: {
    label: "Message tags",
    placeholder: "Add tag...",
  },
};

export const Required: Story = {
  args: {
    label: "Message tags",
    placeholder: "Add tag...",
    required: true,
  },
};

export const Optional: Story = {
  args: {
    label: "Message tags",
    placeholder: "Add tag...",
    optionalText: "(Optional)",
  },
};

export const Clearable: Story = {
  args: {
    leftIcon: <SearchIcon />,
    placeholder: "Add tag...",
    isClearable: true,
  },
};

export const Error: Story = {
  args: {
    placeholder: "Add tag...",
    error: "Input is invalid",
  },
};

export const Disabled: Story = {
  args: {
    label: "Message tags",
    placeholder: "Add tag...",
    isDisabled: true,
  },
};

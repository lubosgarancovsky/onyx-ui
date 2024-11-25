import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../../src/components";
import { PlaceholderIcon } from "../../src/icons";

const meta = {
  title: "Core/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  args: { onClick: () => console.log("Clicked") },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    color: "primary",
    children: "Primary button",
  },
};

export const Default: Story = {
  args: {
    children: "Default button",
  },
};

export const Danger: Story = {
  args: {
    color: "danger",
    children: "Danger button",
  },
};

export const WithIcon: Story = {
  args: {
    color: "primary",
    children: "Primary button",
    leftIcon: <PlaceholderIcon />,
  },
};

export const IconOnly: Story = {
  args: {
    color: "primary",
    isIconOnly: true,
    children: <PlaceholderIcon />,
  },
};

export const Disabled: Story = {
  args: {
    color: "primary",
    children: "Disabled button",
    isDisabled: true,
  },
};

export const Loading: Story = {
  args: {
    children: "Loading button",
    isLoading: true,
  },
};

export const Flat: Story = {
  args: {
    children: "Borderless button",
    variant: "flat",
    leftIcon: <PlaceholderIcon />,
  },
};

export const Outlined: Story = {
  args: {
    children: "Outlined button",
    variant: "outline",
    leftIcon: <PlaceholderIcon />,
  },
};

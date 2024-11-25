import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "../../src/components";

const meta = {
  title: "Core/Checkbox",
  component: Checkbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  args: { onChange: (e) => console.log("Checked", e.target.checked) },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {},
};

export const Labeled: Story = {
  args: { label: "Subscribe to newsletter" },
};

export const InitiallyChecked: Story = {
  args: { initiallyChecked: true, label: "Subscribe to newsletter" },
};

export const Required: Story = {
  args: {
    label: "Agree with terms & conditions",
    required: true,
  },
};

export const Optional: Story = {
  args: {
    label: "Subscribe to newsletter",
    optionalText: "(Optional)",
  },
};

export const Error: Story = {
  args: {
    label: "Agree with terms & conditions",
    required: true,
    error: "It is required to agree with terms & conditions before continuing",
  },
};

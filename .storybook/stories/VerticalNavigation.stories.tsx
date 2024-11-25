import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  VerticalNavigation,
  VerticalNavigationItem,
} from "../../src/components";
import { PlaceholderIcon } from "../../src/icons";

const meta = {
  title: "Core/VerticalNavigation",
  component: VerticalNavigation,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  //   args: { onChange: (e) => console.log(e.target.value) },
} satisfies Meta<typeof VerticalNavigation>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    className: "w-[16rem]",
    label: "Menu",
    children: (
      <>
        <VerticalNavigationItem
          href="#"
          icon={<PlaceholderIcon />}
          active
          alert={1}
        >
          Projects
        </VerticalNavigationItem>
        <VerticalNavigationItem href="#" icon={<PlaceholderIcon />}>
          Organizations
        </VerticalNavigationItem>
        <VerticalNavigationItem href="#" icon={<PlaceholderIcon />} alert={4}>
          Teams
        </VerticalNavigationItem>
        <VerticalNavigationItem href="#" icon={<PlaceholderIcon />}>
          Settings
        </VerticalNavigationItem>
      </>
    ),
  },
};

export const Primary: Story = {
  args: {
    className: "w-[16rem]",
    label: "Menu",
    children: (
      <>
        <VerticalNavigationItem
          href="#"
          icon={<PlaceholderIcon />}
          primary
          active
          alert={1}
        >
          Projects
        </VerticalNavigationItem>
        <VerticalNavigationItem href="#" icon={<PlaceholderIcon />} primary>
          Organizations
        </VerticalNavigationItem>
        <VerticalNavigationItem
          href="#"
          icon={<PlaceholderIcon />}
          primary
          alert={4}
        >
          Teams
        </VerticalNavigationItem>
        <VerticalNavigationItem href="#" icon={<PlaceholderIcon />} primary>
          Settings
        </VerticalNavigationItem>
      </>
    ),
  },
};

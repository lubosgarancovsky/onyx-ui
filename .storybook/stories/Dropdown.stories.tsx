import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownSeparator,
  DropdownTrigger,
} from "../../src/components";
import { PlaceholderIcon } from "../../src/icons";

const meta = {
  title: "Core/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          <Button>Open dropdown</Button>
        </DropdownTrigger>
        <DropdownContent className="min-w-[12rem]">
          <DropdownItem onClick={() => console.log("Item clicked")}>
            New file
          </DropdownItem>
          <DropdownItem>Copy link</DropdownItem>
          <DropdownItem>Edit file</DropdownItem>
          <DropdownSeparator />
          <DropdownItem variant="danger">Delete file</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          <Button>Open dropdown</Button>
        </DropdownTrigger>
        <DropdownContent className="min-w-[12rem]">
          <DropdownItem icon={<PlaceholderIcon />}>New file</DropdownItem>
          <DropdownItem icon={<PlaceholderIcon />}>Copy link</DropdownItem>
          <DropdownItem icon={<PlaceholderIcon />}>Edit file</DropdownItem>
          <DropdownSeparator />
          <DropdownItem variant="danger" icon={<PlaceholderIcon />}>
            Delete file
          </DropdownItem>
        </DropdownContent>
      </>
    ),
  },
};

export const WithDisabledOptions: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          <Button>Open dropdown</Button>
        </DropdownTrigger>
        <DropdownContent className="min-w-[12rem]">
          <DropdownItem icon={<PlaceholderIcon />}>New file</DropdownItem>
          <DropdownItem icon={<PlaceholderIcon />}>Copy link</DropdownItem>
          <DropdownItem isDisabled icon={<PlaceholderIcon />}>
            Edit file
          </DropdownItem>
          <DropdownItem isDisabled variant="danger" icon={<PlaceholderIcon />}>
            Delete file
          </DropdownItem>
        </DropdownContent>
      </>
    ),
  },
};

export const WithActions: Story = {
  args: {
    children: (
      <>
        <DropdownTrigger>
          <Button>Open dropdown</Button>
        </DropdownTrigger>
        <DropdownContent
          label="Actions"
          className="min-w-[24rem]"
          actions={
            <>
              <Button size="sm">Reset to default</Button>
              <Button color="primary" size="sm">
                Save
              </Button>
            </>
          }
        >
          <DropdownItem icon={<PlaceholderIcon />}>New file</DropdownItem>
          <DropdownItem icon={<PlaceholderIcon />}>Copy link</DropdownItem>
          <DropdownItem icon={<PlaceholderIcon />}>Edit file</DropdownItem>
        </DropdownContent>
      </>
    ),
  },
};

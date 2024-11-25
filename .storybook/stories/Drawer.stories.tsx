import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import {
  Button,
  Drawer,
  DrawerContent,
  DrawerTrigger,
  VerticalNavigation,
  VerticalNavigationDevider,
  VerticalNavigationItem,
} from "../../src/components";
import { PlaceholderIcon } from "../../src/icons";

const meta = {
  title: "Core/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
} satisfies Meta<typeof Drawer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Basic: Story = {
  args: {
    children: (
      <>
        <DrawerTrigger>
          <Button>Open drawer</Button>
        </DrawerTrigger>
        <DrawerContent
          header={
            <div className="flex flex-col">
              <span className="font-bold text-xl">Title</span>
              <span className="text-foreground-100">
                Drawer description text
              </span>
            </div>
          }
        >
          <VerticalNavigation>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Set status
            </VerticalNavigationItem>
            <VerticalNavigationDevider />
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Your profile
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Your repositories
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Your Copilot
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Your projects
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Your stars
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Your gists
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Your organizations
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Your enterprise
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Your sponsorts
            </VerticalNavigationItem>
            <VerticalNavigationDevider />
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Try enterprise
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Feature preview
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Settings
            </VerticalNavigationItem>
            <VerticalNavigationDevider />
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              GitHub Docs
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              GitHub support
            </VerticalNavigationItem>
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              GitHub Community
            </VerticalNavigationItem>
            <VerticalNavigationDevider />
            <VerticalNavigationItem icon={<PlaceholderIcon />} href="#">
              Sign out
            </VerticalNavigationItem>
          </VerticalNavigation>
        </DrawerContent>
      </>
    ),
  },
};

import type { Preview } from "@storybook/react";

import "../src/styles/onyx_theme.css";
import "./preview-style.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    theme: {
      selector: "html",
      dataAttr: "data-theme",
      themeOptions: {
        light: "light",
        dark: "dark",
      },
      defaultTheme: "light",
    },
  },
};

export default preview;

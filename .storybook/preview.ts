import type { Preview } from "@storybook/nextjs";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
    controls: {
      expanded: true,
      sort: "requiredFirst",
    },
    backgrounds: {
      default: "app",
      values: [
        { name: "app", value: "#f5f1e8" },
        { name: "paper", value: "#fcfaf6" },
        { name: "slate", value: "#e2e8f0" },
      ],
    },
  },
};

export default preview;

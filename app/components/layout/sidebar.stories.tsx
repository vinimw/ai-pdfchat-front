import type { Meta, StoryObj } from "@storybook/nextjs";
import { Sidebar } from "./sidebar";

const meta = {
  title: "Layout/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Barra lateral principal do produto. Usa a navegacao do App Router para destacar a rota ativa.",
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen max-w-sm">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Sidebar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Home: Story = {};

export const Documents: Story = {
  parameters: {
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/documents",
      },
    },
  },
};

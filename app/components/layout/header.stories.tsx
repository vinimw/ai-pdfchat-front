import type { Meta, StoryObj } from "@storybook/nextjs";
import { Header } from "./header";

const meta = {
  title: "Layout/Header",
  component: Header,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Cabecalho principal das paginas. Exibe contexto da area atual com titulo e subtitulo opcionais.",
      },
    },
  },
  args: {
    title: "Documents workspace",
    subtitle:
      "Manage indexed files and jump back into each document conversation.",
  },
} satisfies Meta<typeof Header>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TitleOnly: Story = {
  args: {
    subtitle: undefined,
  },
};

export const Minimal: Story = {
  args: {
    title: undefined,
    subtitle: "Use this shell to upload files and inspect grounded answers.",
  },
};

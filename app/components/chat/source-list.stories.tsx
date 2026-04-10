import type { Meta, StoryObj } from "@storybook/nextjs";
import { SourceList } from "./source-list";

const meta = {
  title: "Chat/SourceList",
  component: SourceList,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Lista de trechos recuperados para dar suporte a cada resposta do assistente.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-xl">
        <Story />
      </div>
    ),
  ],
  args: {
    sources: [
      {
        chunk_id: "src-001",
        document_name: "product-handbook.pdf",
        page: 3,
        text: "The onboarding flow should guide the user from file upload to the first grounded answer in under two minutes.",
        score: 0.982,
      },
      {
        chunk_id: "src-002",
        document_name: "product-handbook.pdf",
        page: 8,
        text: "Persistent conversation history helps teams resume document analysis without repeating earlier prompts.",
        score: 0.913,
      },
    ],
  },
} satisfies Meta<typeof SourceList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithSources: Story = {};

export const Empty: Story = {
  args: {
    sources: [],
  },
};

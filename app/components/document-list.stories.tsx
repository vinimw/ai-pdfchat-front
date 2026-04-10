import type { Meta, StoryObj } from "@storybook/nextjs";
import { DocumentList } from "./document-list";

const meta = {
  title: "Documents/DocumentList",
  component: DocumentList,
  tags: ["autodocs"],
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Grade de documentos processados com resumo de paginas, caracteres e atalho para abrir o chat do arquivo.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="max-w-6xl">
        <Story />
      </div>
    ),
  ],
  args: {
    documents: [
      {
        document_id: "doc-001",
        filename: "quarterly-results.pdf",
        pages: 18,
        characters: 48210,
      },
      {
        document_id: "doc-002",
        filename: "customer-research-notes.pdf",
        pages: 42,
        characters: 125302,
      },
      {
        document_id: "doc-003",
        filename: "product-specification-v3.pdf",
        pages: 9,
        characters: 16440,
      },
    ],
  },
} satisfies Meta<typeof DocumentList>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Populated: Story = {};

export const Empty: Story = {
  args: {
    documents: [],
  },
};

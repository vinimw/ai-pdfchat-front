"use client";

import { useEffect } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs";
import { expect, userEvent, within } from "storybook/test";
import { ChatPanel } from "./chat-panel";
import type { StoredChatMessage } from "@/lib/chat-storage";

type ChatPanelStoryProps = {
  documentId: string;
  initialMessages?: StoredChatMessage[];
};

function ChatPanelStory({
  documentId,
  initialMessages = [],
}: ChatPanelStoryProps) {
  useEffect(() => {
    window.localStorage.setItem(
      `ai-pdf-chat:messages:${documentId}`,
      JSON.stringify(initialMessages)
    );

    return () => {
      window.localStorage.removeItem(`ai-pdf-chat:messages:${documentId}`);
    };
  }, [documentId, initialMessages]);

  return <ChatPanel documentId={documentId} />;
}

const meta = {
  title: "Chat/ChatPanel",
  component: ChatPanelStory,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Painel principal de conversa com historico persistente por documento, composicao de pergunta e painel lateral com as ultimas fontes recuperadas.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen px-5 py-8 md:px-8">
        <Story />
      </div>
    ),
  ],
  args: {
    documentId: "doc-storybook",
    initialMessages: [],
  },
} satisfies Meta<typeof ChatPanelStory>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Empty: Story = {};

export const WithHistory: Story = {
  args: {
    initialMessages: [
      {
        id: "message-1",
        role: "user",
        content: "What is the main goal of this document?",
      },
      {
        id: "message-2",
        role: "assistant",
        content:
          "The document explains how the workspace should support quick PDF uploads and grounded answers with source excerpts.",
        sources: [
          {
            chunk_id: "chunk-21",
            document_name: "product-brief.pdf",
            page: 2,
            text: "The primary goal is to reduce the time between upload and first trustworthy answer.",
            score: 0.977,
          },
        ],
      },
    ],
  },
};

export const AskQuestion: Story = {
  play: async ({ canvasElement }) => {
    const originalFetch = window.fetch;
    window.fetch = async () =>
      ({
        ok: true,
        json: async () => ({
          answer:
            "The document focuses on a fast workflow from upload to grounded chat.",
          sources: [
            {
              chunk_index: 0,
              document_name: "product-brief.pdf",
              page: 1,
              text: "Users should move from PDF upload to meaningful Q&A with supporting evidence.",
              score: 0.995,
            },
          ],
        }),
      }) as Response;

    try {
      const canvas = within(canvasElement);

      await userEvent.type(
        canvas.getByLabelText("Ask a question about this document"),
        "Summarize the objective"
      );
      await userEvent.click(
        canvas.getByRole("button", {
          name: "Ask",
        })
      );

      await expect(
        canvas.getByText(
          "The document focuses on a fast workflow from upload to grounded chat."
        )
      ).toBeInTheDocument();
    } finally {
      window.fetch = originalFetch;
    }
  },
};

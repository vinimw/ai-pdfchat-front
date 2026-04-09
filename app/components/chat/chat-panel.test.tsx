"use client";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChatPanel } from "./chat-panel";
import { askDocumentQuestion } from "@/lib/api/client/chat";
import {
  clearMessages,
  loadMessages,
  saveMessages,
} from "@/lib/chat-storage";

jest.mock("@/lib/api/client/chat", () => ({
  askDocumentQuestion: jest.fn(),
}));

jest.mock("@/lib/chat-storage", () => ({
  clearMessages: jest.fn(),
  loadMessages: jest.fn(),
  saveMessages: jest.fn(),
}));

const mockAskDocumentQuestion = jest.mocked(askDocumentQuestion);
const mockClearMessages = jest.mocked(clearMessages);
const mockLoadMessages = jest.mocked(loadMessages);
const mockSaveMessages = jest.mocked(saveMessages);

describe("ChatPanel", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("loads stored messages and shows the latest assistant sources", () => {
    mockLoadMessages.mockReturnValue([
      {
        id: "user-1",
        role: "user",
        content: "Summarize this file.",
      },
      {
        id: "assistant-1",
        role: "assistant",
        content: "Here is the summary.",
        sources: [
          {
            chunk_id: "chunk-2",
            document_name: "Guide.pdf",
            page: 4,
            text: "Relevant excerpt",
            score: 0.87,
          },
        ],
      },
    ]);

    render(<ChatPanel documentId="doc-1" />);

    expect(screen.getByText("2 messages")).toBeInTheDocument();
    expect(screen.getByText("Summarize this file.")).toBeInTheDocument();
    expect(screen.getByText("Here is the summary.")).toBeInTheDocument();
    expect(screen.getByText("Guide.pdf • Page 4")).toBeInTheDocument();
  });

  it("submits a question, renders the response, and persists the conversation", async () => {
    mockLoadMessages.mockReturnValue([]);
    mockSaveMessages.mockImplementation(() => undefined);

    mockAskDocumentQuestion.mockResolvedValue({
      answer: "The document explains the architecture.",
      sources: [
        {
          chunk_id: "chunk-3",
          document_name: "Architecture.pdf",
          page: 2,
          text: "Architecture overview",
          score: 0.945,
        },
      ],
    });

    const user = userEvent.setup();

    render(<ChatPanel documentId="doc-1" />);

    await user.type(
      screen.getByLabelText("Ask a question about this document"),
      "What is the main topic?"
    );
    await user.click(screen.getByRole("button", { name: "Ask" }));

    expect(mockAskDocumentQuestion).toHaveBeenCalledWith(
      "doc-1",
      "What is the main topic?"
    );
    expect(await screen.findByText("The document explains the architecture.")).toBeInTheDocument();
    expect(screen.getByText("Architecture.pdf • Page 2")).toBeInTheDocument();

    await waitFor(() => {
      expect(mockSaveMessages).toHaveBeenLastCalledWith(
        "doc-1",
        expect.arrayContaining([
          expect.objectContaining({
            role: "user",
            content: "What is the main topic?",
          }),
          expect.objectContaining({
            role: "assistant",
            content: "The document explains the architecture.",
          }),
        ])
      );
    });
  });

  it("shows an error when the request fails and clears history", async () => {
    mockLoadMessages.mockReturnValue([
      {
        id: "assistant-1",
        role: "assistant",
        content: "Previous answer",
      },
    ]);

    mockClearMessages.mockImplementation(() => undefined);

    mockAskDocumentQuestion.mockRejectedValue(new Error("API unavailable."));

    const user = userEvent.setup();

    render(<ChatPanel documentId="doc-1" />);

    await user.type(
      screen.getByLabelText("Ask a question about this document"),
      "Can you answer this?"
    );
    await user.click(screen.getByRole("button", { name: "Ask" }));

    expect(await screen.findByText("API unavailable.")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear history" }));

    expect(mockClearMessages).toHaveBeenCalledWith("doc-1");
    expect(screen.getByText(/no messages yet/i)).toBeInTheDocument();
  });
});

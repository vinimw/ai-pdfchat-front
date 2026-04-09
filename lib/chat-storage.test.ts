import { clearMessages, loadMessages, saveMessages } from "./chat-storage";

describe("chat-storage", () => {
  const documentId = "doc-123";
  const storageKey = `ai-pdf-chat:messages:${documentId}`;

  beforeEach(() => {
    window.localStorage.clear();
  });

  it("persists and loads chat messages", () => {
    const messages = [
      {
        id: "message-1",
        role: "user" as const,
        content: "What is this document about?",
      },
    ];

    saveMessages(documentId, messages);

    expect(window.localStorage.getItem(storageKey)).toBe(
      JSON.stringify(messages)
    );
    expect(loadMessages(documentId)).toEqual(messages);
  });

  it("returns an empty array when local storage contains invalid JSON", () => {
    window.localStorage.setItem(storageKey, "{invalid-json");

    expect(loadMessages(documentId)).toEqual([]);
  });

  it("clears persisted messages", () => {
    window.localStorage.setItem(storageKey, JSON.stringify([{ id: "1" }]));

    clearMessages(documentId);

    expect(window.localStorage.getItem(storageKey)).toBeNull();
  });
});

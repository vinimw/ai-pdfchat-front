"use client";

import { useEffect, useMemo, useState } from "react";
import { askDocumentQuestion } from "@/lib/api/client/chat";
import { SourceList } from "./source-list";
import type { ChatSource } from "@/lib/api/schemas/chat";
import {
  clearMessages,
  loadMessages,
  saveMessages,
  type StoredChatMessage,
} from "@/lib/chat-storage";

type Props = {
  documentId: string;
};

export function ChatPanel({ documentId }: Props) {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<StoredChatMessage[]>([]);
  const [hydratedDocumentId, setHydratedDocumentId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedMessages = loadMessages(documentId);
    setMessages(storedMessages);
    setError(null);
    setHydratedDocumentId(documentId);
  }, [documentId]);

  useEffect(() => {
    if (hydratedDocumentId !== documentId) return;
    saveMessages(documentId, messages);
  }, [documentId, hydratedDocumentId, messages]);

  const currentSources = useMemo<ChatSource[]>(() => {
    const assistantMessages = messages.filter(
      (message) => message.role === "assistant"
    );

    const latestAssistantMessage =
      assistantMessages[assistantMessages.length - 1];

    return latestAssistantMessage?.sources ?? [];
  }, [messages]);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuestion = question.trim();
    if (!trimmedQuestion || loading) return;

    const userMessage: StoredChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmedQuestion,
    };

    setMessages((prev) => [...prev, userMessage]);
    setQuestion("");
    setLoading(true);
    setError(null);

    try {
      const data = await askDocumentQuestion(documentId, trimmedQuestion);

      const assistantMessage: StoredChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.answer,
        sources: data.sources,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  function handleClearHistory() {
    setMessages([]);
    setError(null);
    clearMessages(documentId);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <section className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Conversation</h2>

          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="rounded-xl border border-dashed p-5 text-sm text-zinc-500">
                No messages yet. Ask your first question about this document.
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={[
                    "rounded-2xl p-4",
                    message.role === "user"
                      ? "ml-auto max-w-[85%] border bg-zinc-900 text-white"
                      : "mr-auto max-w-[85%] border bg-zinc-50 text-zinc-900",
                  ].join(" ")}
                >
                  <p className="mb-2 text-xs font-medium uppercase tracking-wide opacity-70">
                    {message.role === "user" ? "You" : "Assistant"}
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-6">
                    {message.content}
                  </p>
                </div>
              ))
            )}

            {loading ? (
              <div className="mr-auto max-w-[85%] rounded-2xl border bg-zinc-50 p-4 text-sm text-zinc-500">
                Thinking...
              </div>
            ) : null}
          </div>
        </section>

        <section className="rounded-2xl border bg-white p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium">
                Ask a question about this document
              </label>
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Example: What is the main topic of this document?"
                className="min-h-32 w-full rounded-xl border p-3"
              />
            </div>

            {error ? <p className="text-sm text-red-500">{error}</p> : null}

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-xl border px-4 py-2"
              >
                {loading ? "Thinking..." : "Ask"}
              </button>

              <button
                type="button"
                onClick={handleClearHistory}
                className="rounded-xl border px-4 py-2 text-sm"
              >
                Clear history
              </button>
            </div>
          </form>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Latest sources</h2>
          <SourceList sources={currentSources} />
        </section>
      </aside>
    </div>
  );
}

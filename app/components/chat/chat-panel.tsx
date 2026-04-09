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
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_380px]">
      <div className="space-y-6">
        <section className="app-surface rounded-[28px] p-6 md:p-7">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Conversation
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                Ask and inspect
              </h2>
            </div>
            <p className="text-sm text-slate-600">
              {messages.length} {messages.length === 1 ? "message" : "messages"}
            </p>
          </div>

          <div className="app-scrollbar max-h-[58vh] space-y-4 overflow-y-auto pr-1">
            {messages.length === 0 ? (
              <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/55 p-6 text-sm leading-6 text-slate-500">
                No messages yet. Ask your first question about this document to
                start a grounded conversation.
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={[
                    "rounded-[24px] p-4 shadow-sm",
                    message.role === "user"
                      ? "ml-auto max-w-[88%] border border-slate-900 bg-slate-900 text-white"
                      : "mr-auto max-w-[88%] border border-slate-200 bg-white/90 text-slate-900",
                  ].join(" ")}
                >
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] opacity-70">
                    {message.role === "user" ? "You" : "Assistant"}
                  </p>
                  <p className="whitespace-pre-wrap text-sm leading-6">
                    {message.content}
                  </p>
                </div>
              ))
            )}

            {loading ? (
              <div className="mr-auto max-w-[88%] rounded-[24px] border border-slate-200 bg-white/90 p-4 text-sm text-slate-500">
                Thinking...
              </div>
            ) : null}
          </div>
        </section>

        <section className="app-surface rounded-[28px] p-6 md:p-7">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-800">
                Ask a question about this document
              </label>
              <textarea
                value={question}
                onChange={(event) => setQuestion(event.target.value)}
                placeholder="Example: What is the main topic of this document?"
                className="min-h-32 w-full rounded-[24px] border border-slate-300 bg-white/80 p-4 text-sm leading-6 text-slate-900 outline-none placeholder:text-slate-400 focus:border-cyan-700 focus:bg-white"
              />
            </div>

            {error ? (
              <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </p>
            ) : null}

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? "Thinking..." : "Ask"}
              </button>

              <button
                type="button"
                onClick={handleClearHistory}
                className="rounded-2xl border border-slate-300 bg-white/70 px-5 py-3 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-white"
              >
                Clear history
              </button>
            </div>
          </form>
        </section>
      </div>

      <aside className="space-y-6">
        <section className="app-surface rounded-[28px] p-6 md:sticky md:top-6">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Context
          </p>
          <h2 className="mb-4 mt-2 text-2xl font-semibold tracking-tight text-slate-900">
            Latest sources
          </h2>
          <SourceList sources={currentSources} />
        </section>
      </aside>
    </div>
  );
}

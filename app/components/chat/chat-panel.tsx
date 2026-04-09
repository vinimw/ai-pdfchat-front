"use client";

import { useState } from "react";
import { askDocumentQuestion } from "@/lib/api/client/chat";
import { SourceList } from "./source-list";
import type { ChatSource } from "@/lib/api/schemas/chat";

type Props = {
  documentId: string;
};

export function ChatPanel({ documentId }: Props) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<ChatSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const data = await askDocumentQuestion(documentId, question);

      setAnswer(data.answer);
      setSources(data.sources);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border p-6">
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

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl border px-4 py-2"
        >
          {loading ? "Thinking..." : "Ask"}
        </button>
      </form>

      <section className="rounded-2xl border p-6">
        <h2 className="mb-3 text-xl font-semibold">Answer</h2>
        <p className="whitespace-pre-wrap text-zinc-800">
          {answer || "No answer yet."}
        </p>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="mb-3 text-xl font-semibold">Sources</h2>
        <SourceList sources={sources} />
      </section>
    </div>
  );
}
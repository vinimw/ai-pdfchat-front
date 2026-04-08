"use client";

import { useState } from "react";
import type { ChatResponse } from "@/lib/types";

type Props = {
  documentId: string;
};

export function ChatPanel({ documentId }: Props) {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [answer, setAnswer] = useState<string>("");
  const [sources, setSources] = useState<ChatResponse["sources"]>([]);
  const [error, setError] = useState<string | null>(null);

  async function handleAsk(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          document_id: documentId,
          question,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message ?? "Failed to ask question.");
      }

      setAnswer(data.answer ?? "");
      setSources(data.sources ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleAsk} className="space-y-3 rounded-2xl border p-6">
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ask something about this document..."
          className="min-h-32 w-full rounded-xl border p-3"
        />

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
        <p className="whitespace-pre-wrap">{answer || "No answer yet."}</p>
      </section>

      <section className="rounded-2xl border p-6">
        <h2 className="mb-3 text-xl font-semibold">Sources</h2>
        <div className="space-y-3">
          {sources.length === 0 ? (
            <p>No sources yet.</p>
          ) : (
            sources.map((source, index) => (
              <div key={`${source.chunk_id ?? index}`} className="rounded-xl border p-4">
                <p className="text-sm font-medium">
                  {source.document_name ?? "Document"}
                  {typeof source.page === "number" ? ` • Page ${source.page}` : ""}
                </p>
                <p className="mt-2 text-sm text-zinc-700">{source.text}</p>
                {typeof source.score === "number" ? (
                  <p className="mt-2 text-xs text-zinc-500">
                    Relevance: {source.score.toFixed(3)}
                  </p>
                ) : null}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
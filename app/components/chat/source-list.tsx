import type { ChatSource } from "@/lib/types";

type Props = {
  sources: ChatSource[];
};

export function SourceList({ sources }: Props) {
  if (sources.length === 0) {
    return <p className="text-sm text-zinc-600">No sources found.</p>;
  }

  return (
    <div className="space-y-3">
      {sources.map((source, index) => (
        <div
          key={`${source.chunk_id ?? "source"}-${index}`}
          className="rounded-xl border p-4"
        >
          <p className="text-sm font-medium">
            {source.document_name ?? "Document"}
            {typeof source.page === "number" ? ` • Page ${source.page}` : ""}
          </p>

          <p className="mt-2 text-sm text-zinc-700 whitespace-pre-wrap">
            {source.text}
          </p>

          {typeof source.score === "number" ? (
            <p className="mt-2 text-xs text-zinc-500">
              Relevance score: {source.score.toFixed(3)}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}
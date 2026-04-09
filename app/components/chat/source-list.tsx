import type { ChatSource } from "@/lib/types";

type Props = {
  sources: ChatSource[];
};

export function SourceList({ sources }: Props) {
  if (sources.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/55 p-5">
        <p className="text-sm font-medium text-slate-700">No sources found.</p>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          When the assistant answers with retrieved context, the supporting
          excerpts will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sources.map((source, index) => (
        <div
          key={`${source.chunk_id ?? "source"}-${index}`}
          className="rounded-[22px] border border-slate-200 bg-white/80 p-4"
        >
          <p className="text-sm font-semibold text-slate-900">
            {source.document_name ?? "Document"}
            {typeof source.page === "number" ? ` • Page ${source.page}` : ""}
          </p>

          <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-slate-700">
            {source.text}
          </p>

          {typeof source.score === "number" ? (
            <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-slate-500">
              Relevance score: {source.score.toFixed(3)}
            </p>
          ) : null}
        </div>
      ))}
    </div>
  );
}

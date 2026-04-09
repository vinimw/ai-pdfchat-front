import Link from "next/link";
import type { DocumentItem } from "@/lib/api/schemas/document";

type Props = {
  documents: DocumentItem[];
};

export function DocumentList({ documents }: Props) {
  if (documents.length === 0) {
    return (
      <div className="rounded-[24px] border border-dashed border-slate-300 bg-white/55 p-8 text-center">
        <p className="text-sm font-medium text-slate-700">
          No documents uploaded yet.
        </p>
        <p className="mt-2 text-sm text-slate-500">
          Upload your first PDF above to start building the workspace.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {documents.map((document) => (
        <Link
          key={document.document_id}
          href={`/documents/${document.document_id}`}
          className="app-card group block rounded-[26px] p-5 transition hover:-translate-y-1 hover:border-slate-400/60 hover:bg-white"
        >
          <div className="flex flex-col gap-5">
            <div>
              <div className="mb-4 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
                PDF
              </div>
              <h2 className="line-clamp-2 text-lg font-semibold tracking-tight text-slate-900">
                {document.filename}
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                ID: {document.document_id}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
              {typeof document.pages === "number" ? (
                <div className="rounded-2xl bg-slate-100/80 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Pages
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">{document.pages}</p>
                </div>
              ) : null}

              {typeof document.characters === "number" ? (
                <div className="rounded-2xl bg-slate-100/80 p-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">
                    Chars
                  </p>
                  <p className="mt-1 font-semibold text-slate-900">
                    {document.characters.toLocaleString()}
                  </p>
                </div>
              ) : null}
            </div>

            <p className="text-sm font-medium text-cyan-700 transition group-hover:text-cyan-800">
              Open document chat
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

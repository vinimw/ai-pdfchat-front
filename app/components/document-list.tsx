import Link from "next/link";
import type { DocumentItem } from "@/lib/types";

type Props = {
  documents: DocumentItem[];
};

export function DocumentList({ documents }: Props) {
  if (documents.length === 0) {
    return (
      <div className="rounded-2xl border p-6">
        <p className="text-sm text-zinc-600">
          No documents uploaded yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {documents.map((document) => (
        <Link
          key={document.document_id}
          href={`/documents/${document.document_id}`}
          className="block rounded-2xl border p-5 transition hover:bg-zinc-50"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-semibold">{document.filename}</h2>
              <p className="mt-1 text-sm text-zinc-500">
                ID: {document.document_id}
              </p>
            </div>

            <div className="text-right text-sm text-zinc-500">
              {typeof document.pages === "number" ? (
                <p>{document.pages} pages</p>
              ) : null}

              {typeof document.characters === "number" ? (
                <p>{document.characters} chars</p>
              ) : null}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
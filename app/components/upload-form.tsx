"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { UploadDocumentResponse } from "@/lib/types";

export function UploadForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!file) {
      setError("Please select a PDF.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/documents/upload", {
        method: "POST",
        body: formData,
      });

      const data =
        (await response.json()) as UploadDocumentResponse | { message?: string };

      if (!response.ok || !("document_id" in data)) {
        throw new Error("Upload failed.");
      }

      router.push(`/documents/${data.document_id}`);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
          New upload
        </p>
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
            Add another PDF
          </h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Upload a document to make it available in the library and open a new
            chat session right after processing.
          </p>
        </div>
      </div>

      <div className="app-panel-soft rounded-[16px] p-6">
        <label className="mb-3 block text-sm font-medium text-slate-800">
          Select a PDF file
        </label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="block w-full text-sm text-slate-600 file:mr-4 file:rounded-xl file:border file:border-[#c7d2de] file:bg-white file:px-4 file:py-2.5 file:font-medium file:text-slate-800 hover:file:border-[#9fb6c9] hover:file:bg-slate-50"
        />
        <p className="mt-3 text-sm leading-6 text-slate-500">
          {file
            ? `Ready to upload: ${file.name}`
            : "PDF only. The file will be processed and indexed for chat."}
        </p>
      </div>

      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="inline-flex items-center rounded-xl bg-[#315c7a] px-5 py-3 text-sm font-medium text-white shadow-lg shadow-[#315c7a]/20 hover:-translate-y-0.5 hover:bg-[#284d67] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}

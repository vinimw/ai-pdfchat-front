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
    <form onSubmit={handleSubmit} className="rounded-2xl border p-6 space-y-4">
      <div>
        <label className="mb-2 block text-sm font-medium">Upload PDF</label>
        <input
          type="file"
          accept="application/pdf"
          onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          className="block w-full"
        />
      </div>

      {error ? <p className="text-sm text-red-500">{error}</p> : null}

      <button
        type="submit"
        disabled={loading}
        className="rounded-xl border px-4 py-2"
      >
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
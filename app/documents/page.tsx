import { getDocuments } from "@/lib/api";
import { UploadForm } from "@/app/components/upload-form";
import { DocumentList } from "@/app/components/document-list";

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <main className="mx-auto max-w-5xl p-8 space-y-8">
      <section>
        <h1 className="text-3xl font-semibold">Documents</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Upload PDFs and open a document to start chatting.
        </p>
      </section>

      <UploadForm />

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">Uploaded documents</h2>
        <DocumentList documents={documents} />
      </section>
    </main>
  );
}
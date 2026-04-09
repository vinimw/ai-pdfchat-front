import { getDocuments } from "@/lib/api/server/documents";
import { UploadForm } from "@/app/components/upload-form";
import { DocumentList } from "@/app/components/document-list";
import { Header } from "@/app/components/layout/header";

export default async function DocumentsPage() {
  const documents = await getDocuments();

  return (
    <>
      <Header
        title="Documents"
        subtitle="Upload PDFs and open a document to start chatting."
      />

      <main className="space-y-8 p-6">
        <section className="rounded-2xl border bg-white p-6">
          <UploadForm />
        </section>

        <section className="rounded-2xl border bg-white p-6">
          <h2 className="mb-4 text-xl font-semibold">Uploaded documents</h2>
          <DocumentList documents={documents} />
        </section>
      </main>
    </>
  );
}
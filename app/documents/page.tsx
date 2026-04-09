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
        subtitle="Manage your PDFs, upload new files, and jump into a document chat with a clearer, more structured layout."
      />

      <main className="space-y-6 px-5 pb-10 pt-6 md:px-8 md:pb-12">
        <section className="app-surface rounded-[28px] p-6 md:p-7">
          <UploadForm />
        </section>

        <section className="app-surface rounded-[28px] p-6 md:p-7">
          <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Library
              </p>
              <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-900">
                Uploaded documents
              </h2>
            </div>
            <p className="text-sm text-slate-600">
              {documents.length} {documents.length === 1 ? "document" : "documents"} available
            </p>
          </div>
          <DocumentList documents={documents} />
        </section>
      </main>
    </>
  );
}

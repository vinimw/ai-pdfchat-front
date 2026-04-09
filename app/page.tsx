import Link from "next/link";
import { Header } from "@/app/components/layout/header";

export default function HomePage() {
  return (
    <>
      <Header
        title="Home"
        subtitle="Upload PDFs, explore documents, and ask grounded questions."
      />

      <main className="p-6">
        <section className="mx-auto max-w-4xl rounded-2xl border bg-white p-8">
          <h2 className="text-3xl font-semibold">Welcome to AI PDF Chat</h2>
          <p className="mt-3 max-w-2xl text-zinc-600">
            This app lets you upload documents, process their content, and ask
            questions with answers grounded in source excerpts.
          </p>

          <div className="mt-6">
            <Link
              href="/documents"
              className="inline-block rounded-xl border px-4 py-2"
            >
              Go to documents
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
import Link from "next/link";
import { Header } from "@/app/components/layout/header";

export default function HomePage() {
  return (
    <>
      <Header
        title="Home"
        subtitle="Upload PDFs, explore your knowledge base, and ask grounded questions with a calmer, more polished workspace."
      />

      <main className="px-5 pb-10 pt-6 md:px-8 md:pb-12">
        <section className="app-surface app-hero mx-auto max-w-5xl overflow-hidden rounded-[32px] p-8 md:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-600">
            Better document workflows
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl">
            Turn each PDF into a clean, searchable conversation space.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-7 text-slate-700">
            This app lets you upload documents, process their content, and ask
            questions with answers grounded in source excerpts.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/documents"
              className="inline-flex items-center rounded-2xl bg-slate-900 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-slate-900/20 hover:-translate-y-0.5 hover:bg-slate-800"
            >
              Go to documents
            </Link>
            <div className="inline-flex items-center rounded-2xl border border-white/60 bg-white/60 px-5 py-3 text-sm font-medium text-slate-700">
              Grounded answers with source excerpts
            </div>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[
              ["Upload", "Send PDFs and build a reusable document workspace."],
              ["Explore", "Browse files with clearer metadata and faster access."],
              ["Ask", "Review responses alongside the latest supporting sources."],
            ].map(([title, description]) => (
              <div
                key={title}
                className="rounded-[24px] border border-white/60 bg-white/70 p-5"
              >
                <p className="text-sm font-semibold text-slate-900">{title}</p>
                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

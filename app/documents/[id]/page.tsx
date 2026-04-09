import Link from "next/link";
import { ChatPanel } from "@/app/components/chat/chat-panel";
import { Header } from "@/app/components/layout/header";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DocumentPage({ params }: Props) {
  const { id } = await params;

  return (
    <>
      <Header
        title="Document Chat"
        subtitle="Ask focused questions about a single document and review the latest retrieved sources beside the conversation."
      />

      <main className="mx-auto max-w-7xl space-y-6 px-5 pb-10 pt-6 md:px-8 md:pb-12">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link
            href="/documents"
            className="inline-flex w-fit items-center rounded-2xl border border-slate-300/70 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 hover:border-slate-400 hover:bg-white"
          >
            Back to documents
          </Link>
          <div className="rounded-2xl border border-slate-300/70 bg-white/70 px-4 py-2 text-sm text-slate-600">
            Document ID: <span className="font-medium text-slate-900">{id}</span>
          </div>
        </div>

        <ChatPanel documentId={id} />
      </main>
    </>
  );
}

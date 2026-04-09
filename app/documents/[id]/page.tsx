import Link from "next/link";
import { ChatPanel } from "@/app/components/chat/chat-panel";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DocumentPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-5xl p-8 space-y-6">
      <div>
        <Link href="/documents" className="text-sm text-zinc-600 underline">
          Back to documents
        </Link>
      </div>

      <section>
        <h1 className="text-3xl font-semibold">Document Chat</h1>
        <p className="mt-2 text-sm text-zinc-600">Document ID: {id}</p>
      </section>

      <ChatPanel documentId={id} />
    </main>
  );
}
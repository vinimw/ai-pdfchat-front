import { ChatPanel } from "@/components/chat-panel";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function DocumentChatPage({ params }: Props) {
  const { id } = await params;

  return (
    <main className="mx-auto max-w-4xl p-8">
      <h1 className="mb-2 text-3xl font-semibold">Document chat</h1>
      <p className="mb-6 text-sm text-zinc-600">Document ID: {id}</p>

      <ChatPanel documentId={id} />
    </main>
  );
}
import { UploadForm } from "@/app/components/upload-form";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-3xl p-8">
      <h1 className="mb-2 text-3xl font-semibold">AI PDF Chat</h1>
      <p className="mb-6 text-sm text-zinc-600">
        Upload a PDF and start asking grounded questions.
      </p>

      <UploadForm />
    </main>
  );
}
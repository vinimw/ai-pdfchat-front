import { BACKEND_API_URL } from "@/lib/env";
import type { ChatResponse, DocumentItem, DocumentsResponse } from "./types";

export async function getDocuments(): Promise<DocumentItem[]> {
  const response = await fetch(`${BACKEND_API_URL}/api/documents`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch documents.");
  }

  const data = (await response.json()) as DocumentsResponse | DocumentItem[];

  if (Array.isArray(data)) {
    return data;
  }

  return data.items ?? [];
}

export async function askDocumentQuestion(
  documentId: string,
  question: string
): Promise<ChatResponse> {
  const response = await fetch(`${BACKEND_API_URL}/api/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      document_id: documentId,
      question,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to ask question.");
  }

  return (await response.json()) as ChatResponse;
}

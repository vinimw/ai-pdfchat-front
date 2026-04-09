import { chatResponseSchema } from "../schemas/chat";
import { ApiError } from "@/lib/errors/api-error";

export async function askDocumentQuestion(
  documentId: string,
  question: string
) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      document_id: documentId,
      question,
    }),
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError(
      data?.message ?? "Failed to ask question.",
      response.status,
      data
    );
  }

  const parsed = chatResponseSchema.safeParse(data);

  if (!parsed.success) {
    throw new ApiError(
      "Invalid chat response format.",
      500,
      parsed.error.flatten()
    );
  }

  return parsed.data;
}

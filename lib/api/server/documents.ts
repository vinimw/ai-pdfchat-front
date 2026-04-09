import "server-only";

import { documentsResponseSchema } from "../schemas/document";
import { ApiError } from "@/lib/errors/api-error";

function normalizeDocumentsResponse(data: unknown) {
  const parsed = documentsResponseSchema.safeParse(data);

  if (!parsed.success) {
    throw new ApiError(
      "Invalid documents response format.",
      500,
      parsed.error.flatten()
    );
  }

  return Array.isArray(parsed.data) ? parsed.data : parsed.data.items;
}

export async function getDocuments() {
  const response = await fetch(
    `${
      process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3002"
    }/api/documents`,
    {
      method: "GET",
      cache: "no-store",
    }
  );

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new ApiError("Failed to fetch documents.", response.status, data);
  }

  return normalizeDocumentsResponse(data);
}

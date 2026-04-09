import { z } from "zod";
import { BACKEND_API_URL } from "@/lib/env";

const requestSchema = z.object({
  document_id: z.string().min(1),
  question: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const parsed = requestSchema.safeParse(body);

  if (!parsed.success) {
    return Response.json(
      {
        message: "Invalid request body.",
        details: parsed.error.flatten(),
      },
      { status: 400 }
    );
  }

  const response = await fetch(`${BACKEND_API_URL}/api/chat/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(parsed.data),
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const responseData = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    return Response.json(
      {
        message: "Chat request failed.",
        details: responseData,
      },
      { status: response.status }
    );
  }

  return Response.json(responseData, { status: 200 });
}

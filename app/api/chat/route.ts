import { BACKEND_API_URL } from "@/lib/env";

export async function POST(request: Request) {
  const body = await request.json();

  const response = await fetch(`${BACKEND_API_URL}/api/chat/ask`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    const errorBody = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return Response.json(
      { message: "Chat request failed", details: errorBody },
      { status: response.status }
    );
  }

  const data = await response.json();
  return Response.json(data);
}

import { BACKEND_API_URL } from "@/lib/env";

export async function GET() {
  const response = await fetch(`${BACKEND_API_URL}/api/documents`, {
    method: "GET",
    cache: "no-store",
  });

  if (!response.ok) {
    return Response.json(
      { message: "Failed to fetch documents" },
      { status: response.status }
    );
  }

  const data = await response.json();
  return Response.json(data);
}

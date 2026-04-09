import { BACKEND_API_URL } from "@/lib/env";

export async function GET() {
  const response = await fetch(`${BACKEND_API_URL}/api/documents`, {
    method: "GET",
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const responseData = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    return Response.json(
      {
        message: "Failed to fetch documents.",
        details: responseData,
      },
      { status: response.status }
    );
  }

  return Response.json(responseData, { status: 200 });
}

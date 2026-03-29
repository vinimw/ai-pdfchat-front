import { BACKEND_API_URL } from "@/lib/env";

export async function POST(request: Request) {
  const formData = await request.formData();

  const response = await fetch(`${BACKEND_API_URL}/api/documents/upload`, {
    method: "POST",
    body: formData,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";

  if (!response.ok) {
    const errorBody = contentType.includes("application/json")
      ? await response.json()
      : await response.text();

    return Response.json(
      { message: "Upload failed", details: errorBody },
      { status: response.status }
    );
  }

  const data = contentType.includes("application/json")
    ? await response.json()
    : null;

  return Response.json(data, { status: 200 });
}

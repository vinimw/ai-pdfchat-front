import { BACKEND_API_URL } from "@/lib/env";

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get("file");

  if (!(file instanceof File)) {
    return Response.json({ message: "File is required." }, { status: 400 });
  }

  const upstreamFormData = new FormData();
  upstreamFormData.append("file", file);

  const response = await fetch(`${BACKEND_API_URL}/api/documents/upload`, {
    method: "POST",
    body: upstreamFormData,
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "";
  const responseData = contentType.includes("application/json")
    ? await response.json().catch(() => null)
    : await response.text().catch(() => null);

  if (!response.ok) {
    return Response.json(
      {
        message: "Upload failed.",
        details: responseData,
      },
      { status: response.status }
    );
  }

  return Response.json(responseData, { status: 200 });
}

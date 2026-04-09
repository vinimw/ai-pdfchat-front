import { render, screen } from "@testing-library/react";
import DocumentsPage from "./page";
import { getDocuments } from "@/lib/api/server/documents";

jest.mock("@/lib/api/server/documents", () => ({
  getDocuments: jest.fn(),
}));

jest.mock("@/app/components/layout/header", () => ({
  Header: ({
    title,
    subtitle,
  }: {
    title?: string;
    subtitle?: string;
  }) => (
    <header>
      <h1>{title}</h1>
      <p>{subtitle}</p>
    </header>
  ),
}));

jest.mock("@/app/components/upload-form", () => ({
  UploadForm: () => <div>Upload form</div>,
}));

jest.mock("@/app/components/document-list", () => ({
  DocumentList: ({ documents }: { documents: Array<{ filename: string }> }) => (
    <div>Document list: {documents.map((document) => document.filename).join(", ")}</div>
  ),
}));

const mockGetDocuments = jest.mocked(getDocuments);

describe("DocumentsPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the upload form and pluralized document count", async () => {
    mockGetDocuments.mockResolvedValue([
      { document_id: "doc-1", filename: "Guide.pdf" },
      { document_id: "doc-2", filename: "Specs.pdf" },
    ]);

    render(await DocumentsPage());

    expect(screen.getByRole("heading", { level: 1, name: "Documents" })).toBeInTheDocument();
    expect(screen.getByText("Upload form")).toBeInTheDocument();
    expect(screen.getByText("2 documents available")).toBeInTheDocument();
    expect(screen.getByText("Document list: Guide.pdf, Specs.pdf")).toBeInTheDocument();
  });

  it("renders the singular document count", async () => {
    mockGetDocuments.mockResolvedValue([
      { document_id: "doc-1", filename: "Guide.pdf" },
    ]);

    render(await DocumentsPage());

    expect(screen.getByText("1 document available")).toBeInTheDocument();
  });
});

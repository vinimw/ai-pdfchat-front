import { render, screen } from "@testing-library/react";
import DocumentPage from "./page";

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    className,
  }: React.ComponentProps<"a"> & { href: string }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

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

jest.mock("@/app/components/chat/chat-panel", () => ({
  ChatPanel: ({ documentId }: { documentId: string }) => (
    <div>Chat panel for {documentId}</div>
  ),
}));

describe("DocumentPage", () => {
  it("renders the document chat header, back link, and chat panel", async () => {
    render(
      await DocumentPage({
        params: Promise.resolve({ id: "doc-42" }),
      })
    );

    expect(screen.getByRole("heading", { level: 1, name: "Document Chat" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to documents" })).toHaveAttribute(
      "href",
      "/documents"
    );
    expect(screen.getByText("Document ID:")).toBeInTheDocument();
    expect(screen.getByText("doc-42")).toBeInTheDocument();
    expect(screen.getByText("Chat panel for doc-42")).toBeInTheDocument();
  });
});

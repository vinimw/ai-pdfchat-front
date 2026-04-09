import { render, screen } from "@testing-library/react";
import { DocumentList } from "./document-list";

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

describe("DocumentList", () => {
  it("renders the empty state when there are no uploaded documents", () => {
    render(<DocumentList documents={[]} />);

    expect(screen.getByText("No documents uploaded yet.")).toBeInTheDocument();
    expect(
      screen.getByText(/upload your first pdf above to start building the workspace/i)
    ).toBeInTheDocument();
  });

  it("renders document metadata and chat links", () => {
    const formattedCharacters = (23456).toLocaleString();

    render(
      <DocumentList
        documents={[
          {
            document_id: "doc-1",
            filename: "Quarterly Report.pdf",
            pages: 12,
            characters: 23456,
          },
          {
            document_id: "doc-2",
            filename: "Short Brief.pdf",
          },
        ]}
      />
    );

    const reportLink = screen.getByRole("link", {
      name: /quarterly report\.pdf/i,
    });
    const briefLink = screen.getByRole("link", {
      name: /short brief\.pdf/i,
    });

    expect(reportLink).toHaveAttribute("href", "/documents/doc-1");
    expect(briefLink).toHaveAttribute("href", "/documents/doc-2");
    expect(screen.getByText("ID: doc-1")).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.getByText(formattedCharacters)).toBeInTheDocument();
    expect(screen.getAllByText("Open document chat")).toHaveLength(2);
    expect(screen.queryByText("ID: doc-2")).toBeInTheDocument();
    expect(screen.queryByText("Pages")).toBeInTheDocument();
    expect(screen.queryByText("Chars")).toBeInTheDocument();
  });
});

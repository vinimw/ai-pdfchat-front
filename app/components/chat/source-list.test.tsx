import { render, screen } from "@testing-library/react";
import { SourceList } from "./source-list";

describe("SourceList", () => {
  it("renders the empty state when no sources are available", () => {
    render(<SourceList sources={[]} />);

    expect(screen.getByText("No sources found.")).toBeInTheDocument();
    expect(
      screen.getByText(/supporting excerpts will appear here/i)
    ).toBeInTheDocument();
  });

  it("renders source metadata and formatted relevance", () => {
    render(
      <SourceList
        sources={[
          {
            chunk_id: "chunk-1",
            document_name: "Spec.pdf",
            page: 7,
            score: 0.98234,
            text: "This is the supporting excerpt.",
          },
        ]}
      />
    );

    expect(screen.getByText("Spec.pdf • Page 7")).toBeInTheDocument();
    expect(
      screen.getByText("This is the supporting excerpt.")
    ).toBeInTheDocument();
    expect(screen.getByText("Relevance score: 0.982")).toBeInTheDocument();
  });
});

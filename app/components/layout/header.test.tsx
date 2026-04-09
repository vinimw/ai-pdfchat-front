import { render, screen } from "@testing-library/react";
import { Header } from "./header";

describe("Header", () => {
  it("renders title, workspace label, and subtitle when provided", () => {
    render(<Header title="Documents" subtitle="Manage your PDFs." />);

    expect(screen.getByText("Workspace")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { level: 1, name: "Documents" })
    ).toBeInTheDocument();
    expect(screen.getByText("Manage your PDFs.")).toBeInTheDocument();
  });

  it("renders an empty shell when title and subtitle are omitted", () => {
    const { container } = render(<Header />);

    expect(screen.queryByText("Workspace")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 1 })).not.toBeInTheDocument();
    expect(container.querySelector("header")).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import { AppShell } from "./app-shell";

jest.mock("./sidebar", () => ({
  Sidebar: () => <aside data-testid="sidebar">Sidebar</aside>,
}));

describe("AppShell", () => {
  it("renders the sidebar and page content", () => {
    render(
      <AppShell>
        <main>Page content</main>
      </AppShell>
    );

    expect(screen.getByTestId("sidebar")).toBeInTheDocument();
    expect(screen.getByText("Page content")).toBeInTheDocument();
  });
});

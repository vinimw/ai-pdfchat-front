"use client";

import { render, screen } from "@testing-library/react";
import { Sidebar } from "./sidebar";
import { usePathname } from "next/navigation";

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

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = jest.mocked(usePathname);

describe("Sidebar", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the navigation and highlights the home route", () => {
    mockUsePathname.mockReturnValue("/");

    render(<Sidebar />);

    expect(screen.getByText("AI PDF Chat")).toBeInTheDocument();
    expect(screen.getByText("Workspace ready")).toBeInTheDocument();

    const homeLink = screen.getByRole("link", { name: /home/i });
    const documentsLink = screen.getByRole("link", { name: /documents/i });

    expect(homeLink).toHaveAttribute("href", "/");
    expect(homeLink.className).toContain("bg-slate-900");
    expect(documentsLink).toHaveAttribute("href", "/documents");
    expect(documentsLink.className).toContain("text-slate-700");
  });

  it("highlights the documents route for nested document paths", () => {
    mockUsePathname.mockReturnValue("/documents/doc-123");

    render(<Sidebar />);

    const homeLink = screen.getByRole("link", { name: /home/i });
    const documentsLink = screen.getByRole("link", { name: /documents/i });

    expect(homeLink.className).toContain("text-slate-700");
    expect(documentsLink.className).toContain("bg-slate-900");
  });
});

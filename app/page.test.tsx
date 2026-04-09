import { render, screen } from "@testing-library/react";
import HomePage from "./page";

jest.mock("next/link", () => {
  return function MockLink({
    children,
    href,
    ...props
  }: React.ComponentProps<"a"> & { href: string }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe("HomePage", () => {
  it("renders the hero content and documents CTA", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Home",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        level: 2,
        name: /turn each pdf into a clean, searchable conversation space/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Go to documents" })
    ).toHaveAttribute("href", "/documents");
    expect(screen.getByText("Grounded answers with source excerpts")).toBeInTheDocument();
  });
});

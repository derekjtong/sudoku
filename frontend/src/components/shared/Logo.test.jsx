import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Logo from "./Logo";

describe("Logo Component", () => {
  it("renders the logo image", () => {
    render(<Logo />);
    const logoImage = screen.getByRole("img");
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute("src", expect.stringContaining("sudoku-white-small.png"));
  });

  it("renders the logo text", () => {
    render(<Logo />);
    const logoText = screen.getByText("Sudoku");
    expect(logoText).toBeInTheDocument();
    expect(logoText).toHaveClass("text-4xl", "font-bold", "text-white", "hover:text-gray-300");
  });

  it("links to the home page", () => {
    render(<Logo />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});

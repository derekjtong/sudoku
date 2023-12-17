import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Content from "./Content";
import { SudokuBoardProvider } from "../providers/board-provider";

const mockProps = {
  boardDimension: 9,
  difficulty: 1,
  currentGameId: "",
  setCurrentGameId: vi.fn(),
  addNoteMode: false,
  setAddNoteMode: vi.fn(),
  setBoardDimension: vi.fn(),
};

describe("Content Component", () => {
  it("should render without crashing", () => {
    render(
      <SudokuBoardProvider size={9} currentGameId={""}>
        <Content {...mockProps} />
      </SudokuBoardProvider>,
    );
    expect(screen.getByTestId("board")).toBeInTheDocument();
    expect(screen.getByText("Enjoy Free Sudoku Online!")).toBeInTheDocument();
  });
  it("should open admin dialong when ADMIN COMMANDS button is clicked", () => {
    render(
      <SudokuBoardProvider size={9} currentGameId={""}>
        <Content {...mockProps} />
      </SudokuBoardProvider>,
    );
    const adminButton = screen.getByText("ADMIN COMMANDS");
    fireEvent.click(adminButton);
    expect(screen.getByTestId("adminDialog")).toBeInTheDocument();
  });
});

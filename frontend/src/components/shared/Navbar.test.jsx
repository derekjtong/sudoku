import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import Navbar from "./Navbar";
import { SudokuBoardContext } from "../providers/board-provider";

describe("Navbar Component", () => {
  const mockSetBoardDimension = vi.fn();
  const mockSetDifficulty = vi.fn();
  const mockSetCurrentGameId = vi.fn();
  const mockSetSelectedCell = vi.fn();

  const renderNavbar = (initialDimension = 9) => {
    render(
      <SudokuBoardContext.Provider value={{ setSelectedCell: mockSetSelectedCell }}>
        <Navbar setBoardDimension={mockSetBoardDimension} setDifficulty={mockSetDifficulty} setCurrentGameId={mockSetCurrentGameId} />
      </SudokuBoardContext.Provider>,
    );
    mockSetBoardDimension(initialDimension);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the logo", () => {
    renderNavbar();
    expect(screen.getByRole("img")).toBeInTheDocument();
  });

  it("renders new game button", () => {
    renderNavbar();
    expect(screen.getByText("New Game")).toBeInTheDocument();
  });

  it("toggles the 4x4 dropdown", () => {
    renderNavbar();
    const button4x4 = screen.getByText("4 x 4");
    fireEvent.click(button4x4);
    expect(screen.getByText("Easy")).toBeInTheDocument();
    fireEvent.click(button4x4);
    expect(screen.queryByText("Easy")).toBeNull();
  });

  it("toggles the 9x9 dropdown", () => {
    renderNavbar();
    const button9x9 = screen.getByText("9 x 9");
    fireEvent.click(button9x9);
    expect(screen.getByText("Easy")).toBeInTheDocument();
    fireEvent.click(button9x9);
    expect(screen.queryByText("Easy")).toBeNull();
  });

  it("handles difficulty change from 9x9 to 4x4", () => {
    renderNavbar();
    // Open 4x4 dropdown and select 'Easy'
    fireEvent.click(screen.getByText("4 x 4"));
    fireEvent.click(screen.getByText("Easy"));

    // Assert that the SwitchPuzzleDialog is shown and interact with it
    expect(screen.getByText("Your progress will be lost. Are you sure you want to continue?")).toBeInTheDocument();

    // Click 'Continue' on the dialog
    fireEvent.click(screen.getByText("Continue"));

    // Check if the appropriate callbacks are called
    expect(mockSetBoardDimension).toHaveBeenCalledWith(4);
    expect(mockSetDifficulty).toHaveBeenCalledWith(1);
    expect(mockSetCurrentGameId).toHaveBeenCalledWith("");
  });

  it("handles difficulty change from 4x4 to 9x9", () => {
    renderNavbar(4);
    // Open 9x9 dropdown and select a difficulty level (e.g., 'Easy')
    fireEvent.click(screen.getByText("9 x 9"));
    fireEvent.click(screen.getByText("Easy"));

    // Assert that the SwitchPuzzleDialog is shown and interact with it
    expect(screen.getByText("Your progress will be lost. Are you sure you want to continue?")).toBeInTheDocument();

    // Click 'Continue' on the dialog
    fireEvent.click(screen.getByText("Continue"));

    // Check if the appropriate callbacks are called with the new dimension and difficulty
    expect(mockSetBoardDimension).toHaveBeenCalledWith(9);
    expect(mockSetDifficulty).toHaveBeenCalledWith(1);
    expect(mockSetCurrentGameId).toHaveBeenCalledWith("");
  });

  it("resets the game when 'New Game' button is clicked", () => {
    renderNavbar();

    // Click the 'New Game' button
    fireEvent.click(screen.getByText("New Game"));

    // Check if setCurrentGameId was called with an empty string to reset the game
    expect(mockSetCurrentGameId).toHaveBeenCalledWith("");
  });

  // TODO: fix this test
  // it("closes dropdowns when clicking outside", async () => {
  //   render(
  //     <SudokuBoardContext.Provider value={{ setSelectedCell: mockSetSelectedCell }}>
  //       <Navbar setBoardDimension={mockSetBoardDimension} setDifficulty={mockSetDifficulty} setCurrentGameId={mockSetCurrentGameId} />
  //       <div>Test Text</div>
  //     </SudokuBoardContext.Provider>,
  //   );

  //   // Open 4x4 dropdown
  //   fireEvent.click(screen.getByText("4 x 4"));
  //   expect(screen.getByText("Easy")).toBeInTheDocument();

  //   // Simulate a click outside the dropdown
  //   fireEvent.mouseDown(screen.getByText("Test Text"));
  //   await waitFor(() => expect(screen.queryByText("Easy")).not.toBeInTheDocument());

  //   // Open 9x9 dropdown
  //   fireEvent.click(screen.getByText("9 x 9"));
  //   expect(screen.getByText("Easy")).toBeInTheDocument();

  //   // Simulate another click outside the dropdown
  //   fireEvent.mouseDown(document.body);
  //   await waitFor(() => expect(screen.queryByText("Easy")).not.toBeInTheDocument());
  // });
});

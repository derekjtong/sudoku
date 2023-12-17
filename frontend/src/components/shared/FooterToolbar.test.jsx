import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { SudokuBoardContext, SudokuBoardProvider } from "../providers/board-provider";
import FooterToolbar from "./FooterToolbar";
import { correctSoFar, getRandomHint, getSpecificHint, undo, undoUntilCorrect } from "../../api/boardManipulation";

vi.mock("../../api/boardManipulation", () => ({
  undo: vi.fn(),
  undoUntilCorrect: vi.fn(),
  getRandomHint: vi.fn(),
  getSpecificHint: vi.fn(),
  correctSoFar: vi.fn(),
  switchNote: vi.fn(),
}));

describe("FooterToolbar Component", () => {
  const mockProps = {
    currentGameId: "test-game-id",
    addNoteMode: false,
    setAddNoteMode: vi.fn(),
  };
  const mockContextValue = {
    selectedCell: { row: 1, col: 1 },
  };
  beforeEach(() => {
    // Reset all mocks before each test
    vi.resetAllMocks();
  });

  it("should render without crashing", () => {
    render(
      <SudokuBoardProvider size={9} currentGameId={"test-game-id"}>
        <FooterToolbar {...mockProps} />
      </SudokuBoardProvider>,
    );
    expect(screen.getByText("Undo")).toBeInTheDocument();
    // Add checks for other buttons here
  });

  it("calls 'undo' function when 'Undo' button is clicked", async () => {
    render(
      <SudokuBoardProvider size={9} currentGameId={"test-game-id"}>
        <FooterToolbar {...mockProps} />
      </SudokuBoardProvider>,
    );
    const undoButton = screen.getByText("Undo");
    fireEvent.click(undoButton);
    await waitFor(() => {
      expect(undo).toHaveBeenCalledWith("test-game-id");
    });
  });

  it("calls 'undoUntilCorrect' function when 'Undo Until Correct' button is clicked", async () => {
    render(
      <SudokuBoardProvider size={9} currentGameId={"test-game-id"}>
        <FooterToolbar {...mockProps} />
      </SudokuBoardProvider>,
    );
    const undoButton = screen.getByText("Undo Until Correct");
    fireEvent.click(undoButton);
    await waitFor(() => {
      expect(undoUntilCorrect).toHaveBeenCalledWith("test-game-id");
    });
  });
  it("calls 'getRandomHint' function when 'Random Hint' button is clicked", async () => {
    render(
      <SudokuBoardProvider size={9} currentGameId={"test-game-id"}>
        <FooterToolbar {...mockProps} />
      </SudokuBoardProvider>,
    );
    const randomHintButton = screen.getByText("Random Hint");
    fireEvent.click(randomHintButton);
    await waitFor(() => {
      expect(getRandomHint).toHaveBeenCalledWith("test-game-id");
    });
  });

  it("calls 'getSpecificHint' function when 'Specific Hint' button is clicked", async () => {
    render(
      <SudokuBoardContext.Provider value={mockContextValue}>
        <FooterToolbar {...mockProps} />
      </SudokuBoardContext.Provider>,
    );

    const specificHintButton = screen.getByText("Specific Hint");
    fireEvent.click(specificHintButton);

    await waitFor(() => {
      expect(getSpecificHint).toHaveBeenCalledWith("test-game-id", 1, 1);
    });
  });

  it("calls 'correctSoFar' function when 'Check Board' button is clicked", async () => {
    render(
      <SudokuBoardProvider size={9} currentGameId={"test-game-id"}>
        <FooterToolbar {...mockProps} />
      </SudokuBoardProvider>,
    );
    const checkBoardButton = screen.getByText("Check Board");
    fireEvent.click(checkBoardButton);
    await waitFor(() => {
      expect(correctSoFar).toHaveBeenCalledWith("test-game-id");
    });
  });

  // it("toggles note mode when 'Notes On/Off' button is clicked", async () => {
  //   render(
  //     <SudokuBoardProvider size={9} currentGameId={"test-game-id"}>
  //       <FooterToolbar {...mockProps} />
  //     </SudokuBoardProvider>,
  //   );
  //   const noteButton = screen.getByText("Notes Off");
  //   fireEvent.click(noteButton);
  //   await waitFor(() => {
  //     expect(switchNote).toHaveBeenCalledWith("test-game-id");
  //     expect(mockProps.setAddNoteMode).toHaveBeenCalledWith(true); // Assuming the mock switchNote function returns { noteMode: true }
  //   });
  // });

  // Additional tests can be written to check the state changes and conditional rendering
});

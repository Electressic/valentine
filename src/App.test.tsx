import { render, fireEvent, screen } from "@testing-library/react";
import ValentineProposal from "./App";

describe("ValentineProposal", () => {
  it("renders initial message", () => {
    render(<ValentineProposal />);
    expect(screen.getByText(/My Dearest Valentine/)).toBeTruthy();
  });

  it("shows both buttons initially", () => {
    render(<ValentineProposal />);
    expect(screen.getByText(/Yes/i)).toBeTruthy();
    expect(screen.getByText(/No/i)).toBeTruthy();
  });

  it("changes message when clicking No", () => {
    render(<ValentineProposal />);
    const noButton = screen.getByText(/No/i);
    fireEvent.click(noButton);
    expect(screen.getByText(/Are you absolutely sure/i)).toBeTruthy();
  });

  it("shows success message when clicking Yes", () => {
    render(<ValentineProposal />);
    const yesButton = screen.getByText(/Yes/i);
    fireEvent.click(yesButton);
    expect(screen.getByText(/YAY!/i)).toBeTruthy();
  });

  it("updates mobile state based on window width", () => {
    // Mock window.innerWidth
    window.innerWidth = 375; // Mobile width
    render(<ValentineProposal />);

    // Trigger resize event
    window.dispatchEvent(new Event("resize"));

    // Reset window width
    window.innerWidth = 1024;
  });
});

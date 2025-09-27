import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";
import CreateAccountForm from "./CreateAccountForm";
import * as api from "../services/accountService";

// Mock the accountService module
vi.mock("../services/accountService");

describe("CreateAccountForm", () => {
  it("should call createAccount with the owner name when submitted", async () => {
    // Arrange
    const user = userEvent.setup();
    const mockOnAccountCreated = vi.fn();
    const mockCreatedAccount = {
      id: 3,
      ownerName: "Test User",
      balance: 0,
      transfers: [],
    };

    // Mock the createAccount function
    vi.mocked(api.createAccount).mockResolvedValue(mockCreatedAccount);

    render(<CreateAccountForm onAccountCreated={mockOnAccountCreated} />);

    // Act
    const input = screen.getByPlaceholderText(/enter owner's name/i);
    const button = screen.getByRole("button", { name: /create account/i });

    await user.type(input, "Test User");
    await user.click(button);

    // Assert
    expect(api.createAccount).toHaveBeenCalledWith("Test User");
    // Ensure the callback is called with the new account
    expect(mockOnAccountCreated).toHaveBeenCalledWith(mockCreatedAccount);
  });
});

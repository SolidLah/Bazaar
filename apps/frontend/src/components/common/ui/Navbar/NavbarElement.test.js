import Navbar from "./Navbar";
import { render, screen } from "@testing-library/react";

describe("Navbar component", () => {
  const stubUser = { id: 69 };

  it("Displays login button if user is undefined", () => {
    render(<Navbar user={undefined} />);
    const loginButton = screen.getByText(/login/i);
    expect(loginButton).toBeInTheDocument();
  });

  it("Displays logout button if user is defined", () => {
    render(<Navbar user={stubUser} />);
    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
  });
});

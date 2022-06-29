/* import NavbarElement from "./NavbarElement";
import { render, screen } from "@testing-library/react";

const stubUser = { id: 69 };

describe("Navbar component", () => {
  it("Displays login button if user is undefined", () => {
    render(<NavbarElement user={undefined} />);
    const loginButton = screen.getByText(/login/i);
    expect(loginButton).toBeInTheDocument();
  });

  it("Displays logout button if user is defined", () => {
    render(<NavbarElement user={stubUser} />)
    const logoutButton = screen.getByText(/logout/i);
    expect(logoutButton).toBeInTheDocument();
  });
}); */

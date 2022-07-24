import { render, screen } from "@testing-library/react";
import AuthButton from "../AuthButton";

test("Render logout button if logged in", () => {
  render(<AuthButton user={true} />);
  const logoutButton = screen.getByRole("button");
  expect(logoutButton).toHaveTextContent("Logout");
});

test("Render login button if logged out", () => {
  render(<AuthButton user={false} />);
  const loginButton = screen.getByRole("button");
  expect(loginButton).toHaveTextContent("Login");
});

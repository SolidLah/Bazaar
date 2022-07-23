import { render, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import PasswordInput from "../PasswordInput";

test("Password is hidden if set to hide", () => {
  render(<PasswordInput />);

  const showButton = screen.getByRole("button");
  expect(showButton).toHaveTextContent("Show");

  const passwordInput = screen.getByRole("input");
  expect(passwordInput).toHaveAttribute("type", "password");
});

test("Password is shown if set to show", async () => {
  render(<PasswordInput />);

  const showButton = screen.getByRole("button");
  act(() => {
    showButton.click();
  });
  expect(showButton).toHaveTextContent("Hide");

  const passwordInput = screen.getByRole("input");
  expect(passwordInput).toHaveAttribute("type", "text");
});

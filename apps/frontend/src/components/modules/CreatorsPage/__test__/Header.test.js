import { render, screen } from "@testing-library/react";
import Header from "../Header";

test("Render signup button if not logged in", () => {
  render(<Header user={false} />);
  expect(screen.queryByText("Sign Up")).toBeInTheDocument();
});

test("Dont render signup button if logged in", () => {
  render(<Header user={true} />);
  expect(screen.queryByText("Sign Up")).not.toBeInTheDocument();
});

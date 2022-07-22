import { render, screen } from "@testing-library/react";
import ErrorLayout from "./ErrorLayout";

test("Error message is rendered correctly", () => {
  const message = "testing";

  render(<ErrorLayout message={message} />);
  const textElement = screen.getByText("testing");
  expect(textElement).toHaveTextContent("testing");
});

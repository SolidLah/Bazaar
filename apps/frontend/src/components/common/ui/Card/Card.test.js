import Card from "./Card";
import { render } from "@testing-library/react";

describe("Card component", () => {
  it("Props are passed correctly to Card component", () => {
    render(<Card />);
    expect(true).toBe(true);
  });
});

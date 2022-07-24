import { render, screen } from "@testing-library/react";
import ComponentView from "../ComponentView";

describe("Follow button", () => {
  test("Follow button renders Follow if not followed", () => {
    render(<ComponentView isFollowing={false} />);
    const text = screen.getByText("Follow");
    expect(text).toHaveTextContent("Follow");
  });

  test("Follow button renders Unfollow if followed", () => {
    render(<ComponentView isFollowing={true} />);
    const text = screen.getByText("Unfollow");
    expect(text).toHaveTextContent("Unfollow");
  });
});

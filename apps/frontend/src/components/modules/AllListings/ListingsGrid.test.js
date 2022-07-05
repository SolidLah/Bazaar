import ListingsGrid from "./ListingsGrid";
import { render, screen } from "@testing-library/react";

describe("ListingsGrid component", () => {
  const stubItems = [
    {
      id: 1,
      nftData: {
        image:
          "https://gateway.pinata.cloud/ipfs/QmddQwKp51S5JXC4wiNEZxYLBkQjq3L3k9UizWAj3RqSAd",
        name: "stub",
      },
      marketPrice: {
        display: 10,
      },
    },
    {
      id: 2,
      nftData: {
        image:
          "https://gateway.pinata.cloud/ipfs/QmddQwKp51S5JXC4wiNEZxYLBkQjq3L3k9UizWAj3RqSAd",
        name: "stub",
      },
      marketPrice: {
        display: 10,
      },
    },
    {
      id: 3,
      nftData: {
        image:
          "https://gateway.pinata.cloud/ipfs/QmddQwKp51S5JXC4wiNEZxYLBkQjq3L3k9UizWAj3RqSAd",
        name: "stub",
      },
      marketPrice: {
        display: 10,
      },
    },
  ];

  it("Displays market items correctly", () => {
    render(<ListingsGrid items={stubItems} />);
    const numberOfCards = screen.getAllByText("stub");
    expect(numberOfCards).toHaveLength(3);
  });
});

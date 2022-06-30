import Card from "./Card";
import { render, screen } from "@testing-library/react";

describe("Card component", () => {
  const stubItem = {
    id: 1,
    nftData: {
      image:
        "https://gateway.pinata.cloud/ipfs/QmddQwKp51S5JXC4wiNEZxYLBkQjq3L3k9UizWAj3RqSAd",
      name: "stub",
    },
    marketPrice: {
      display: 10,
    },
  };

  it("NFT name is displayed in Card component", () => {
    render(<Card item={stubItem} />);
    const nftName = screen.getByText(stubItem.nftData.name);
    expect(nftName).toBeInTheDocument();
  });

  it("NFT price is displayed in Card component", () => {
    render(<Card item={stubItem} />);
    const nftPrice = screen.getByText(stubItem.marketPrice.display, {
      exact: false,
    });
    expect(nftPrice).toBeInTheDocument();
  });
});

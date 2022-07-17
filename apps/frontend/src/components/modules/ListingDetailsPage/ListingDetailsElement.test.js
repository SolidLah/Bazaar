import ListingDetailsElement from "./ListingDetailsElement";
import { render, screen } from "@testing-library/react";

describe("ListingDetailsElement component", () => {
  const stubItem = {
    nftData: {
      image:
        "https://gateway.pinata.cloud/ipfs/QmddQwKp51S5JXC4wiNEZxYLBkQjq3L3k9UizWAj3RqSAd",
      name: "stub-name",
      description: "stub-description",
    },
    marketPrice: {
      display: 10,
    },
    marketData: [0, 1, 2, 3, "0x9A2f115a7BaF8B9a16448c98EeB6734b5b90ABdF"],
  };

  it("NFT name is displayed in ListingDetailsElement component", () => {
    render(<ListingDetailsElement item={stubItem} />);
    const nftName = screen.getByText(stubItem.nftData.name);
    expect(nftName).toBeInTheDocument();
  });

  it("NFT description is displayed in ListingDetailsElement component", () => {
    render(<ListingDetailsElement item={stubItem} />);
    const nftDescription = screen.getByText(stubItem.nftData.description);
    expect(nftDescription).toBeInTheDocument();
  });

  it("NFT seller is displayed in ListingDetailsElement component", () => {
    const slicedAddress = `${stubItem.marketData[4].slice(
      0,
      3
    )}...${stubItem.marketData[4].slice(38)}`;

    render(<ListingDetailsElement item={stubItem} />);
    const nftDescription = screen.getByText(slicedAddress);
    expect(nftDescription).toBeInTheDocument();
  });

  it("NFT price is displayed in ListingDetailsElement component", () => {
    render(<ListingDetailsElement item={stubItem} />);
    const nftPrice = screen.getByText(stubItem.marketPrice.display, {
      exact: false,
    });
    expect(nftPrice).toBeInTheDocument();
  });
});

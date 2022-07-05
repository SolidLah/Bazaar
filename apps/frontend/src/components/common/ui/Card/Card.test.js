import Card from "./Card";
import { render, screen } from "@testing-library/react";

describe("UnlinkedCard component", () => {
  const stubItem = {
    image:
      "https://gateway.pinata.cloud/ipfs/QmddQwKp51S5JXC4wiNEZxYLBkQjq3L3k9UizWAj3RqSAd",
    name: "stub",
  };

  it("NFT name is displayed in UnlinkedCard component", () => {
    render(<Card item={stubItem} />);
    const nftName = screen.getByText(stubItem.name, { exact: false });
    expect(nftName).toBeInTheDocument();
  });
});

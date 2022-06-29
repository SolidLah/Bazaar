import UnlinkedCard from "./UnlinkedCard";
import { render, screen } from "@testing-library/react";

const stubItem = {
  image:
    "https://gateway.pinata.cloud/ipfs/QmddQwKp51S5JXC4wiNEZxYLBkQjq3L3k9UizWAj3RqSAd",
  name: "stub",
};

describe("UnlinkedCard component", () => {
  it("NFT name is displayed in UnlinkedCard component", () => {
    render(<UnlinkedCard item={stubItem} />);
    const nftName = screen.getByText(stubItem.name, { exact: false });
    expect(nftName).toBeInTheDocument();
  });
});

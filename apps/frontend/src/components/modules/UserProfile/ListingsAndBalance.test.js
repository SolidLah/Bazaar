import { render, screen } from "@testing-library/react";
import ListingsAndBalance from "./ListingsAndBalance";
import stubItems from "src/lib/stubData";

describe("ListingsAndBalance component", () => {
  const stubEmpty = {
    userListings: [],
    userNFTs: [],
  };

  it("Displays listings correctly", () => {
    render(<ListingsAndBalance items={stubItems} />);
    const numberOfCards = screen.getAllByText("stub-listing");
    expect(numberOfCards).toHaveLength(6);
  });

  it("Displays owned NFTs correctly", () => {
    render(<ListingsAndBalance items={stubItems} />);
    const numberOfCards = screen.getAllByText("stub-owned");
    expect(numberOfCards).toHaveLength(6);
  });

  it("Displays notification of no listings", () => {
    render(<ListingsAndBalance items={stubEmpty} />);
    const noListingsElement = screen.getByText("No listings");
    expect(noListingsElement).toBeInTheDocument();
  });

  it("Displays notification of no owned NFTs", () => {
    render(<ListingsAndBalance items={stubEmpty} />);
    const noNFTsElement = screen.getByText("No NFTs owned");
    expect(noNFTsElement).toBeInTheDocument();
  });
});

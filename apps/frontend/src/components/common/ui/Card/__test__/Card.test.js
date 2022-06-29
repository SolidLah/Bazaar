import Card from "../Card";
import { render, screen } from "@testing-library/react";
import stubNFT from "../../../../../../lib/stubNFT";

const userItems = stubNFT.userNFTs;
const userItem = userItems[0];

describe("Card component", () => {
  it("Props are passed correctly to Card component", () => {
    render(<Card item={userItem} />);
    const nftName = screen.getByText(userItem.nftData.name);
    console.log(nftName);
    expect(nftName).toBeInTheDocument();
  });
});

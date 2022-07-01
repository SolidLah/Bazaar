const { expect } = require("chai");
const { ethers } = require("hardhat");

// 1 ether === 10^18 wei
// const toEth = (num) => ethers.utils.formatEther(num)
const toWei = (num) => ethers.utils.parseEther(num.toString());

describe("Marketplace contract", function () {
  let NFT;
  let MARKETPLACE;
  let nft;
  let marketplace;
  let deployer;
  let addr1;
  let addr2;
  let URI = "Sample URI";
  let NAME = "Bazaar NFT";
  let SYMBOL = "BFT";
  let FEE_PERCENT = 5;

  beforeEach(async function () {
    // signers
    [deployer, addr1, addr2] = await ethers.getSigners();

    // contract factories
    MARKETPLACE = await ethers.getContractFactory("Marketplace");
    NFT = await ethers.getContractFactory("NFT");

    // deploy contracts
    marketplace = await MARKETPLACE.deploy(FEE_PERCENT);
    nft = await NFT.deploy(NAME, SYMBOL, marketplace.address);
  });

  it("Fee percent for marketplace", async function () {
    expect(await marketplace.feePercent()).to.equal(FEE_PERCENT);
  });

  describe("Create market item", async function () {
    beforeEach(async function () {
      await nft.connect(addr1).mint(URI);
    });

    it("Emit MarketItemCreated event", async function () {
      expect(
        await marketplace
          .connect(addr1)
          .createMarketItem(nft.address, 1, toWei(1))
      )
        .to.emit(marketplace, "MarketItemCreated")
        .withArgs(1, nft.address, 1, toWei(1), addr1.address);
    });

    it("Transfer ownership of nft", async function () {
      await marketplace
        .connect(addr1)
        .createMarketItem(nft.address, 1, toWei(1));

      // check ownership
      expect(await nft.ownerOf(1)).to.equal(marketplace.address);

      // check balances
      expect(await nft.balanceOf(addr1.address)).to.equal(0);
      expect(await nft.balanceOf(marketplace.address)).to.equal(1);
    });

    it("Check details of created MarketItem", async function () {
      await marketplace
        .connect(addr1)
        .createMarketItem(nft.address, 1, toWei(1));

      // check details
      const item = await marketplace.getMarketItem(1);
      expect(item.itemId).to.equal(1);
      expect(item.nftAddress).to.equal(nft.address);
      expect(item.tokenId).to.equal(1);
      expect(item.price).to.equal(toWei(1));
      expect(item.seller).to.equal(addr1.address);
      expect(item.sold).to.equal(false);
    });

    it("Revert if price is set to zero", async function () {
      await expect(
        marketplace.connect(addr1).createMarketItem(nft.address, 1, 0)
      ).to.be.revertedWith("Price must be greater than zero");
    });
  });

  describe("Purchase market item", async function () {
    const priceInEth = 1;
    const priceInWei = toWei(priceInEth);
    const totalPriceInWei = toWei(priceInEth * ((100 + FEE_PERCENT) / 100));
    const feeInWei = totalPriceInWei.sub(priceInWei);

    beforeEach(async function () {
      // addr1: seller, addr2: buyer
      await nft.connect(addr1).mint(URI);
      await marketplace
        .connect(addr1)
        .createMarketItem(nft.address, 1, priceInWei);
    });

    it("Emit MarketItemSold event", async function () {
      expect(
        await marketplace
          .connect(addr2)
          .purchaseMarketItem(1, { value: totalPriceInWei })
      )
        .to.emit(marketplace, "MarketItemSold")
        .withArgs(1, nft.address, 1, toWei(1), addr1.address, addr2.address);
    });

    it("Transfer ownership of nft", async function () {
      await marketplace
        .connect(addr2)
        .purchaseMarketItem(1, { value: totalPriceInWei });

      // check ownership
      expect(await nft.ownerOf(1)).to.equal(addr2.address);

      // check balances
      expect(await nft.balanceOf(addr2.address)).to.equal(1);
      expect(await nft.balanceOf(marketplace.address)).to.equal(0);
    });

    it("Check details of transaction", async function () {
      const initialDeployerBalance = await deployer.getBalance();
      const initialSellerBalance = await addr1.getBalance();

      await marketplace
        .connect(addr2)
        .purchaseMarketItem(1, { value: totalPriceInWei });

      // marked as sold
      const soldItem = await marketplace.getMarketItem(1);
      expect(soldItem.sold).to.equal(true);

      // check payment
      const finalDeployerBalance = await deployer.getBalance();
      const finalSellerBalance = await addr1.getBalance();

      expect(finalDeployerBalance).to.equal(
        initialDeployerBalance.add(feeInWei)
      );
      expect(finalSellerBalance).to.equal(initialSellerBalance.add(priceInWei));
    });

    it("Revert if MarketItem does not exist", async function () {
      await expect(
        marketplace
          .connect(addr2)
          .purchaseMarketItem(0, { value: totalPriceInWei })
      ).to.be.revertedWith("Market item does not exist");
    });

    it("Revert if insufficient value", async function () {
      await expect(
        marketplace.connect(addr2).purchaseMarketItem(1, { value: 0 })
      ).to.be.revertedWith("Insufficient funds");
    });

    it("Revert if MarketItem already sold", async function () {
      marketplace
        .connect(addr2)
        .purchaseMarketItem(1, { value: totalPriceInWei });

      await expect(
        marketplace
          .connect(addr2)
          .purchaseMarketItem(1, { value: totalPriceInWei })
      ).to.be.revertedWith("Market item already sold");
    });
  });

  describe("Data fetching functions", async function () {
    const priceInEth = 1;
    const priceInWei = toWei(priceInEth);

    beforeEach(async function () {
      await nft.connect(addr1).mint(URI);
      await nft.connect(addr1).mint(URI);
      await marketplace
        .connect(addr1)
        .createMarketItem(nft.address, 1, priceInWei);
      await marketplace
        .connect(addr1)
        .createMarketItem(nft.address, 2, priceInWei);

      await nft.connect(addr2).mint(URI);
      await marketplace
        .connect(addr2)
        .createMarketItem(nft.address, 3, priceInWei);
    });

    it("Fetch market items", async function () {
      const marketItemsArray = await marketplace.fetchMarketItems();

      expect(marketItemsArray.length).to.equal(3);
      expect(marketItemsArray[0].itemId).to.equal(1);
      expect(marketItemsArray[0].nftAddress).to.equal(nft.address);
      expect(marketItemsArray[0].tokenId).to.equal(1);
      expect(marketItemsArray[0].price).to.equal(toWei(1));
      expect(marketItemsArray[0].seller).to.equal(addr1.address);
      expect(marketItemsArray[0].sold).to.equal(false);
    });

    it("Fetch user items", async function () {
      const marketItemsArray = await marketplace.fetchUserItems(addr1.address);

      expect(marketItemsArray.length).to.equal(2);
      expect(marketItemsArray[0].itemId).to.equal(1);
      expect(marketItemsArray[0].nftAddress).to.equal(nft.address);
      expect(marketItemsArray[0].tokenId).to.equal(1);
      expect(marketItemsArray[0].price).to.equal(toWei(1));
      expect(marketItemsArray[0].seller).to.equal(addr1.address);
      expect(marketItemsArray[0].sold).to.equal(false);
    });
  });
});

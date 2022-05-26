// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Marketplace is ReentrancyGuard, IERC721Receiver {
    struct MarketItem {
        uint256 itemId;
        address nftAddress;
        uint256 tokenId;
        uint256 price;
        address payable seller;
        bool sold;
    }

    using Counters for Counters.Counter;

    address payable public immutable deployer;
    uint256 public immutable feePercent;
    Counters.Counter private idCounter;
    mapping(uint256 => MarketItem) private marketItemsMapping;

    event MarketItemCreated(
        uint256 indexed itemId,
        address nftAddress,
        uint256 indexed tokenId,
        uint256 price,
        address seller
    );

    event MarketItemSold(
        uint256 indexed itemId,
        address nftAddress,
        uint256 indexed tokenId,
        uint256 price,
        address seller,
        address buyer
    );

    constructor(uint256 _feePercent) {
        deployer = payable(msg.sender);
        feePercent = _feePercent;
    }

    function onERC721Received(
        address operator,
        address from,
        uint256 tokenId,
        bytes calldata data
    ) external pure override returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function getMarketItem(uint256 _itemId)
        public
        view
        returns (MarketItem memory)
    {
        return marketItemsMapping[_itemId];
    }

    function createMarketItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) public nonReentrant {
        require(_price > 0, "Price must be greater than zero");

        IERC721(_nftAddress).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId
        );

        idCounter.increment();
        uint256 _newItemId = idCounter.current();

        marketItemsMapping[_newItemId] = MarketItem(
            _newItemId,
            _nftAddress,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );

        emit MarketItemCreated(
            _newItemId,
            _nftAddress,
            _tokenId,
            _price,
            msg.sender
        );
    }

    function getTotalPriceForItem(uint256 _itemId)
        public
        view
        returns (uint256)
    {
        return (marketItemsMapping[_itemId].price * (100 + feePercent)) / 100;
    }

    function purchaseMarketItem(uint256 _soldItemId)
        public
        payable
        nonReentrant
    {
        require(
            _soldItemId >= 0 && _soldItemId <= idCounter.current(),
            "Market item does not exist"
        );

        uint256 _totalPrice = getTotalPriceForItem(_soldItemId);
        MarketItem storage _currMarketItem = marketItemsMapping[_soldItemId];

        require(msg.value >= _totalPrice, "Insufficient funds");
        require(!_currMarketItem.sold, "Market item already sold");

        address payable _seller = _currMarketItem.seller;

        // pay seller and marketplace
        _seller.transfer(_currMarketItem.price);
        deployer.transfer(_totalPrice - _currMarketItem.price);

        // update item
        _currMarketItem.sold = true;
        IERC721(_currMarketItem.nftAddress).safeTransferFrom(
            address(this),
            msg.sender,
            _currMarketItem.tokenId
        );

        emit MarketItemSold(
            _soldItemId,
            _currMarketItem.nftAddress,
            _soldItemId,
            _currMarketItem.price,
            _currMarketItem.seller,
            msg.sender
        );
    }
}

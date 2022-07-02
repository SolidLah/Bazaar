// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard, ERC721Holder {
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
    Counters.Counter private soldCounter;
    mapping(uint256 => MarketItem) private marketItemsMapping;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price,
        address seller
    );

    event MarketItemSold(
        uint256 indexed itemId,
        address indexed nftAddress,
        uint256 indexed tokenId,
        uint256 price,
        address seller,
        address buyer
    );

    constructor(uint256 _feePercent) {
        deployer = payable(msg.sender);
        feePercent = _feePercent;
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
            _soldItemId > 0 && _soldItemId <= idCounter.current(),
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

        // update sold count
        soldCounter.increment();

        emit MarketItemSold(
            _soldItemId,
            _currMarketItem.nftAddress,
            _soldItemId,
            _currMarketItem.price,
            _currMarketItem.seller,
            msg.sender
        );
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 _totalCount = idCounter.current();
        uint256 _unsoldCount = idCounter.current() - soldCounter.current();
        uint256 _currIndex = 0;

        MarketItem[] memory _items = new MarketItem[](_unsoldCount);

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (!_currItem.sold) {
                _items[_currIndex] = _currItem;
                _currIndex++;
            }
        }

        return _items;
    }

    function fetchUserItems(address user)
        public
        view
        returns (MarketItem[] memory)
    {
        uint256 _totalCount = idCounter.current();
        uint256 _userCount = 0;
        uint256 _currIndex = 0;

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.seller == user && !_currItem.sold) {
                _userCount++;
            }
        }

        MarketItem[] memory _userItems = new MarketItem[](_userCount);

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.seller == user && !_currItem.sold) {
                _userItems[_currIndex] = _currItem;
                _currIndex++;
            }
        }

        return _userItems;
    }
}

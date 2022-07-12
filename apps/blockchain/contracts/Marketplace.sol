// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "./NFT.sol";

contract Marketplace is ReentrancyGuard, ERC721Holder, Ownable {
    struct MarketItem {
        // marketplace properties
        uint256 itemId;
        address payable seller;
        address payable owner;
        uint256 price;
        uint256 marketPrice;
        bool sold;
        // NFT properties
        address nftAddress;
        string nftName;
        string nftSymbol;
        address payable minter;
        uint256 tokenId;
        string tokenURI;
    }

    using Counters for Counters.Counter;

    uint256 public immutable feePercent;
    Counters.Counter public idCounter;
    mapping(uint256 => MarketItem) public marketItemsMapping;

    constructor(uint256 _feePercent) {
        feePercent = _feePercent;
    }

    function createMarketItem(
        address _nftAddress,
        uint256 _tokenId,
        uint256 _price
    ) public nonReentrant {
        require(_price > 0, "Price must be greater than zero");
        require(
            NFT(_nftAddress).ownerOf(_tokenId) == msg.sender,
            "Not the owner of token"
        ); // check token exists

        NFT(_nftAddress).safeTransferFrom(
            msg.sender,
            address(this),
            _tokenId
        );

        // getting new itemId
        idCounter.increment();
        uint256 _newItemId = idCounter.current();

        // getting NFT details
        string memory _nftName = NFT(_nftAddress).name();
        string memory _nftSymbol = NFT(_nftAddress).symbol();
        address payable _minter = payable(NFT(_nftAddress).owner());
        string memory _tokenURI = NFT(_nftAddress).tokenURI(
            _tokenId
        );

        // getting market price
        uint256 _marketPrice = (_price * (100 + feePercent)) / 100;

        marketItemsMapping[_newItemId] = MarketItem(
            _newItemId,
            payable(msg.sender),
            payable(address(0)),
            _price,
            _marketPrice,
            false,
            _nftAddress,
            _nftName,
            _nftSymbol,
            _minter,
            _tokenId,
            _tokenURI
        );
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

        MarketItem storage _currMarketItem = marketItemsMapping[_soldItemId];
        uint256 _totalPrice = _currMarketItem.marketPrice;

        require(!_currMarketItem.sold, "Market item already sold");
        require(msg.value >= _totalPrice, "Insufficient funds");

        address payable _seller = _currMarketItem.seller;

        // pay seller and marketplace
        _seller.transfer(_currMarketItem.price);
        payable(this.owner()).transfer(_totalPrice - _currMarketItem.price);

        // update item
        _currMarketItem.sold = true;
        _currMarketItem.owner = payable(msg.sender);
        NFT(_currMarketItem.nftAddress).safeTransferFrom(
            address(this),
            msg.sender,
            _currMarketItem.tokenId
        );
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 _totalCount = idCounter.current();
        uint256 _unsoldCount = 0;
        uint256 _currIndex = 0;

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (!_currItem.sold) {
                _unsoldCount++;
            }
        }

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

    function fetchCollectionItems(address _collection)
        public
        view
        returns (MarketItem[] memory) 
    {
        uint256 _totalCount = idCounter.current();

        // get array of active listings
        uint256 _listedCount = 0;
        uint256 _listedIndex = 0;

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.nftAddress == _collection) {
                _listedCount++;
            }
        }

        MarketItem[] memory _listedItems = new MarketItem[](_listedCount);

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.nftAddress == _collection && !_currItem.sold) {
                _listedItems[_listedIndex] = _currItem;
                _listedIndex++;
            }
        }

        return _listedItems;
    }

    function fetchUserItems(address _user)
        public
        view
        returns (MarketItem[] memory listed, MarketItem[] memory owned)
    {
        uint256 _totalCount = idCounter.current();

        // get array of active listings
        uint256 _listedCount = 0;
        uint256 _listedIndex = 0;

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.seller == _user && !_currItem.sold) {
                _listedCount++;
            }
        }

        MarketItem[] memory _listedItems = new MarketItem[](_listedCount);

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.seller == _user && !_currItem.sold) {
                _listedItems[_listedIndex] = _currItem;
                _listedIndex++;
            }
        }

        // get array of owned items
        uint256 _ownedCount = 0;
        uint256 _ownedIndex = 0;

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.owner == _user && _currItem.sold) {
                _ownedCount++;
            }
        }

        MarketItem[] memory _ownedItems = new MarketItem[](_ownedCount);

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.owner == _user && _currItem.sold) {
                _ownedItems[_ownedIndex] = _currItem;
                _ownedIndex++;
            }
        }

        return (_listedItems, _ownedItems);
    }
}

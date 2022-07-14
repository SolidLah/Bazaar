// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./NFT.sol";

contract Marketplace is ReentrancyGuard, ERC721Holder, Ownable {
    struct MarketItem {
        // marketplace properties
        uint256 itemId;
        address payable seller;
        address payable owner;
        uint256 price;
        uint256 marketPrice;
        bool active;
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

    function createMarketItem(address _nftAddress, uint256 _tokenId)
        public
    {
        // check token exists
        require(
            NFT(_nftAddress).ownerOf(_tokenId) == msg.sender,
            "Not the owner of token"
        );

        NFT(_nftAddress).safeTransferFrom(msg.sender, address(this), _tokenId);

        // getting new itemId
        idCounter.increment();
        uint256 _newItemId = idCounter.current();

        // getting NFT details
        string memory _nftName = NFT(_nftAddress).name();
        string memory _nftSymbol = NFT(_nftAddress).symbol();
        address payable _minter = payable(NFT(_nftAddress).owner());
        string memory _tokenURI = NFT(_nftAddress).tokenURI(_tokenId);

        marketItemsMapping[_newItemId] = MarketItem(
            _newItemId,
            payable(msg.sender), // seller
            payable(address(0)), // owner
            0, // price
            0, // marketPrice
            false, // active
            _nftAddress,
            _nftName,
            _nftSymbol,
            _minter,
            _tokenId,
            _tokenURI
        );
    }

    function createManyMarketItems(address _nftAddress, uint256[] memory _tokenIds) public {
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            uint256 _tokenId = _tokenIds[i];

            // check token exists
            require(
                NFT(_nftAddress).ownerOf(_tokenId) == msg.sender,
                "Not the owner of token"
            );

            NFT(_nftAddress).safeTransferFrom(msg.sender, address(this), _tokenId);

            // getting new itemId
            idCounter.increment();
            uint256 _newItemId = idCounter.current();

            // getting NFT details
            string memory _nftName = NFT(_nftAddress).name();
            string memory _nftSymbol = NFT(_nftAddress).symbol();
            address payable _minter = payable(NFT(_nftAddress).owner());
            string memory _tokenURI = NFT(_nftAddress).tokenURI(_tokenId);

            marketItemsMapping[_newItemId] = MarketItem(
                _newItemId,
                payable(msg.sender), // seller
                payable(address(0)), // owner
                0, // price
                0, // marketPrice
                false, // active
                _nftAddress,
                _nftName,
                _nftSymbol,
                _minter,
                _tokenId,
                _tokenURI
            );
        }
    }

    function listMarketItem(uint256 _itemId, uint256 _price)
        public
        nonReentrant
    {
        require(_price > 0, "Price must be greater than zero");

        // getting market price
        uint256 _marketPrice = (_price * (100 + feePercent)) / 100;

        // update market item
        MarketItem storage _currMarketItem = marketItemsMapping[_itemId];
        _currMarketItem.active = true;
        _currMarketItem.price = _price;
        _currMarketItem.marketPrice = _marketPrice;
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

        require(_currMarketItem.active, "Market item not listed");
        require(msg.value >= _totalPrice, "Insufficient funds");

        address payable _seller = _currMarketItem.seller;

        // pay seller and marketplace
        _seller.transfer(_currMarketItem.price);
        payable(this.owner()).transfer(_totalPrice - _currMarketItem.price);

        // update item
        _currMarketItem.active = false;
        _currMarketItem.owner = payable(msg.sender);
        NFT(_currMarketItem.nftAddress).safeTransferFrom(
            address(this),
            msg.sender,
            _currMarketItem.tokenId
        );
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint256 _totalCount = idCounter.current();
        uint256 _activeCount = 0;
        uint256 _currIndex = 0;

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.active) {
                _activeCount++;
            }
        }

        MarketItem[] memory _items = new MarketItem[](_activeCount);

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.active) {
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
        uint256 _collectionCount = 0;
        uint256 _collectionIndex = 0;

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.nftAddress == _collection) {
                _collectionCount++;
            }
        }

        MarketItem[] memory _collectionItems = new MarketItem[](
            _collectionCount
        );

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.nftAddress == _collection) {
                _collectionItems[_collectionIndex] = _currItem;
                _collectionIndex++;
            }
        }

        return _collectionItems;
    }

    function fetchUserListedItems(address _user)
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

            if (_currItem.seller == _user && _currItem.active) {
                _listedCount++;
            }
        }

        MarketItem[] memory _listedItems = new MarketItem[](_listedCount);

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.seller == _user && _currItem.active) {
                _listedItems[_listedIndex] = _currItem;
                _listedIndex++;
            }
        }

        return _listedItems;
    }

    function fetchUserOwnedItems(address _user)
        public
        view
        returns (MarketItem[] memory)
    {
        uint256 _totalCount = idCounter.current();

        // get array of owned items
        uint256 _ownedCount = 0;
        uint256 _ownedIndex = 0;

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.owner == _user && !_currItem.active) {
                _ownedCount++;
            }
        }

        MarketItem[] memory _ownedItems = new MarketItem[](_ownedCount);

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            MarketItem storage _currItem = marketItemsMapping[i];

            if (_currItem.owner == _user && !_currItem.active) {
                _ownedItems[_ownedIndex] = _currItem;
                _ownedIndex++;
            }
        }

        return _ownedItems;
    }

    function fetchUserItems(address _user)
        public
        view
        returns (MarketItem[] memory listed, MarketItem[] memory owned)
    {
        MarketItem[] memory _listedItems = this.fetchUserListedItems(_user);
        MarketItem[] memory _ownedItems = this.fetchUserOwnedItems(_user);

        return (_listedItems, _ownedItems);
    }
}

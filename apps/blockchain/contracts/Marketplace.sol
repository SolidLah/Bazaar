// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/interfaces/IERC721Receiver.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Marketplace is ReentrancyGuard, IERC721Receiver {
    struct MarketItem {
        uint itemId;
        IERC721 nft;
        uint tokenId;
        uint price;
        address payable seller;
        bool sold;
    }

    using Counters for Counters.Counter;

    address payable public immutable deployer;
    uint public immutable feePercent;
    Counters.Counter public idCounter;
    mapping(uint => MarketItem) public marketItemsMapping;

    constructor(uint _feePercent) {
        deployer = payable(msg.sender);
        feePercent = _feePercent;
    }

    function onERC721Received(address operator, address from, uint256 tokenId, bytes calldata data) override external pure returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    function listNFT(IERC721 _nft, uint _tokenId, uint _price) public nonReentrant {
        require(_price > 0, "Price must be greater than zero");

        _nft.safeTransferFrom(msg.sender, address(this), _tokenId);

        uint256 newItemId = idCounter.current();

        marketItemsMapping[newItemId] = MarketItem(
            newItemId,
            _nft,
            _tokenId,
            _price,
            payable(msg.sender),
            false
        );

        idCounter.increment();
    }
}

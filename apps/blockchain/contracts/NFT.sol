// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenId;

    constructor(string memory _name, string memory _symbol) ERC721(_name, _symbol) {}

    function mint(string memory _tokenURI) public returns (uint256) {
        uint256 newItemId = _tokenId.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, _tokenURI);

        _tokenId.increment();
        return newItemId;
    }
}

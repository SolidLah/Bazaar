// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public idCounter;

    event Minted (
        string name,
        string symbol,
        uint indexed tokenId,
        string tokenURI
    );

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    function mint(string memory tokenURI) public {
        uint256 newTokenId = idCounter.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        emit Minted(this.name(), this.symbol(), newTokenId, tokenURI);

        idCounter.increment();
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private idCounter;
    address private immutable contractAddress;

    event Minted(
        string name,
        string symbol,
        uint256 indexed tokenId,
        string tokenURI
    );

    constructor(
        string memory name,
        string memory symbol,
        address _contractAddress
    ) ERC721(name, symbol) {
        contractAddress = _contractAddress;
    }

    function getCurrentId() public view returns (uint256) {
        return idCounter.current();
    }

    function mint(string memory tokenURI) public {
        uint256 newTokenId = idCounter.current();
        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        setApprovalForAll(contractAddress, true);

        emit Minted(this.name(), this.symbol(), newTokenId, tokenURI);

        idCounter.increment();
    }
}

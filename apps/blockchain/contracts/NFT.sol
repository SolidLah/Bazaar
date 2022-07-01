// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;

    Counters.Counter private idCounter;
    address private immutable contractAddress;
    address payable public immutable deployer;

    constructor(
        string memory name,
        string memory symbol,
        address _contractAddress
    ) ERC721(name, symbol) {
        contractAddress = _contractAddress;
        deployer = payable(msg.sender);
    }

    function mint(string memory tokenURI) public {
        idCounter.increment();
        uint256 newTokenId = idCounter.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        setApprovalForAll(contractAddress, true);
    }
}

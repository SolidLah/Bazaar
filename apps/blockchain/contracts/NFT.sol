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

    function getCurrentId() public view returns (uint256) {
        return idCounter.current();
    }

    function mint(string memory tokenURI) public {
        idCounter.increment();
        uint256 newTokenId = idCounter.current();

        _safeMint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        setApprovalForAll(contractAddress, true);
    }

    function fetchUserNFTs(address user) public view returns (string[] memory) {
        uint256 _totalCount = idCounter.current();
        uint256 _userCount = 0;
        uint256 _currIndex = 0;

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            if (this.ownerOf(i) == user) {
                _userCount++;
            }
        }

        string[] memory _userNFTs = new string[](_userCount);

        for (uint256 i = 1; i < _totalCount + 1; i++) {
            if (this.ownerOf(i) == user) {
                _userNFTs[_currIndex] = this.tokenURI(i);
                _currIndex++;
            }
        }

        return _userNFTs;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721, ERC721Enumerable, ERC721URIStorage, Ownable {
    struct Token {
        address nftAddress;
        string nftName;
        string nftSymbol;
        uint256 tokenId;
        string tokenURI;
    }

    using Counters for Counters.Counter;

    Counters.Counter public idCounter;
    address private immutable contractAddress;

    constructor(
        string memory _name,
        string memory _symbol,
        address _contractAddress
    ) ERC721(_name, _symbol) {
        contractAddress = _contractAddress;
    }

    function mint(string memory _uri) public onlyOwner {
        idCounter.increment();
        uint256 _tokenId = idCounter.current();

        _safeMint(msg.sender, _tokenId);
        _setTokenURI(_tokenId, _uri);

        setApprovalForAll(contractAddress, true);
    }

    function mintMany(string[] memory _uris) public onlyOwner {
        for (uint256 i = 0; i < _uris.length; i++) {
            idCounter.increment();
            uint256 _tokenId = idCounter.current();

            _safeMint(msg.sender, _tokenId);
            _setTokenURI(_tokenId, _uris[i]);

            setApprovalForAll(contractAddress, true);
        }
    }

    function fetchUserTokens(address _user) public view returns (Token[] memory) {
        uint256 _userCount = this.balanceOf(_user);
        Token[] memory _userTokens = new Token[](_userCount);

        for (uint256 i = 0; i < _userCount; i++) {
            uint256 _currTokenId = this.tokenOfOwnerByIndex(_user, i);
            string memory _currTokenURI = this.tokenURI(_currTokenId);

            _userTokens[i] = Token(
                address(this),
                this.name(),
                this.symbol(),
                _currTokenId,
                _currTokenURI
            );
        }

        return _userTokens;
    }

    // The following functions are overrides required by Solidity.

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

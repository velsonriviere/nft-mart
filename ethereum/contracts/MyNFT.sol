// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts@4.8.1/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts@4.8.1/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts@4.8.1/access/Ownable.sol";
import "@openzeppelin/contracts@4.8.1/utils/Counters.sol";

contract MyNFT is ERC721 {
    event NftBought(address _seller, address _buyer, uint256 _price);
    using Counters for Counters.Counter;
    using Strings for uint256;

    Counters.Counter private _tokenIdCounter;

    address[] public deployedAuctions;

    mapping (uint256 => uint256) public tokenIdToPrice;

    mapping (uint256 => address) public tokenIdToAddress;

    mapping (uint256 => address) public tokenIdToCreator;

    mapping (uint256 => uint256) public tokenIdToRoyalty;


    constructor() ERC721('MyNFT', 'NFT') {
        //_mint(msg.sender, 1);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gamercontest.com/nft/";
    }


    //MINTING
    function trueMint( uint256 royalty, uint256 itemPrice, bool onSale) public returns (uint256)  {
        _tokenIdCounter.increment();
        uint256 salePrice = 0;
        uint256 tokenId = _tokenIdCounter.current();
        require(royalty <=  95, 'Royalty percentage too high. Must be less than or equal to 95');
        address to = msg.sender;
        if(onSale){ salePrice = itemPrice;}
        tokenIdToCreator[tokenId] = to;
        tokenIdToAddress[tokenId] = to;
        tokenIdToPrice[tokenId] = salePrice;
        tokenIdToRoyalty[tokenId] = royalty;

        _mint(to, tokenId);
        return tokenId;
    }



    //Buying Straight
    function allowBuy(uint256 _tokenId, uint256 _price) external {
        require(msg.sender == ownerOf(_tokenId), 'Not owner of this token');
        require(_price > 0, 'Price zero');
        tokenIdToPrice[_tokenId] = _price;
    }

    function disallowBuy(uint256 _tokenId) external {
        require(msg.sender == ownerOf(_tokenId), 'Not owner of this token');
        tokenIdToPrice[_tokenId] = 0;
    }

    function buy(uint256 _tokenId) external payable {
        uint256 price = tokenIdToPrice[_tokenId];
        require(price > 0, 'This token is not for sale');
        require(msg.value >= price, 'Value is not enough, check wallet');

        address seller = ownerOf(_tokenId);
        address creator = tokenIdToCreator[_tokenId]; //Send royalty to
        uint256 royalty = tokenIdToRoyalty[_tokenId];
        uint256 restofSplit = 100 - royalty;
        _transfer(seller, msg.sender, _tokenId);
        tokenIdToAddress[_tokenId] = msg.sender;
        tokenIdToPrice[_tokenId] = 0; // not for sale anymore
        uint256 balance = msg.value;
        uint256 balanceOne = balance * restofSplit / 100;
        uint256 balanceTwo = balance * royalty / 100;
        ( bool transferOne, ) = payable(seller).call{value: balanceOne}("");
        ( bool transferTwo, ) = payable(creator).call{value: balanceTwo}("");
        require(transferOne && transferTwo, "Transfer failed.");
        emit NftBought(seller, msg.sender, msg.value);
    }
    // Initalize an Auction

    function createAuction () public {
        Auction newAuction = new Auction(msg.sender);
        address auctionAddress = address(newAuction);
        deployedAuctions.push(auctionAddress);

    }

    function auctionTransfer(uint256 _tokenId, uint256 highestBid, address buyer) external {
        address seller = ownerOf(_tokenId);
        _transfer(seller, buyer, _tokenId);
        tokenIdToAddress[_tokenId] = buyer;
        //payable(seller).transfer(highestBid); // send the ETH to the seller; done in auc contract
        emit NftBought(seller, buyer, highestBid);
    }

    function getDeployedAuctions() public view returns ( address[] memory) {
        return  deployedAuctions;
    }


}

contract Auction {
    event Start();
    event End(address highestBidder, uint highestBid);
    event Bid(address indexed sender, uint amount);
    event Withdraw(address indexed bidder, uint amount, bytes data);

    address  public seller;

    bool public started;
    bool public ended;
    uint public endAt;

    bool transferToBuyer;
    bool transferToSeller;

    uint256 public nftId;

    uint public highestBid;
    address public highestBidder;
    mapping(address => uint) public bids;


    constructor (address creator) {
        seller = payable(creator);
    }

    function start( uint256 _nftId, uint startingBid, address creator) external {
        require(!started, "Already started!");
        require(creator == seller, "You did not start the auction!");
        highestBid = startingBid;
        nftId = _nftId;
        started = true;
        endAt = block.timestamp + 15 minutes;

        emit Start();
    }

    function bid(address newBidder, uint bidValue) external payable {
        require(started, "Not started.");
        require(block.timestamp < endAt, "Ended!");
        require(msg.value > highestBid);

        if (highestBidder != address(0)) {
            bids[highestBidder] += highestBid;
        }

        highestBid = bidValue;
        highestBidder = newBidder;

        emit Bid(highestBidder, highestBid);
    }

    function withdraw(address wBidder) external payable {
        uint bal = bids[wBidder];
        bids[wBidder] = 0;
        (bool sent, bytes memory data) = payable(wBidder).call{value: bal}("");
        require(sent, "Could not withdraw");

        emit Withdraw(wBidder, bal, data);
    }

    function end() external {
        require(started, "You need to start first!");
        require(block.timestamp >= endAt, "Auction is still ongoing!");
        require(!ended, "Auction already ended!");

        if (highestBidder != address(0)) {
            (bool sent,) = seller.call{value: highestBid}("");
            require(sent, "Could not pay seller!");
            transferToBuyer = true;
        } else {

            transferToSeller = true;

        }

        ended = true;
        emit End(highestBidder, highestBid);
    }
}




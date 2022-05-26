import { useState, useEffect, useCallback, useMemo } from "react"
// import { create as ipfsHttpClient } from "ipfs-http-client"
import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import { useWeb3Context } from "../../contexts/Web3Context"
import { NFTContractData } from "../../contractData"
import { toWei } from "../../functions"

const MintForm = () => {
  const web3Context = useWeb3Context()
  const { nftContract, marketplaceContract } = web3Context.contracts
  const { ethersInitialised } = web3Context.interface

  const [image, setImage] = useState()
  const [price, setPrice] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const payload = useMemo(() => {
    return {
      name,
      description,
      image,
    }
  }, [name, description, image])

  const mintAndList = useCallback(
    async (uri) => {
      if (typeof window.ethereum === "undefined") {
        alert("MetaMask not installed!")
        return
      }

      if (!ethersInitialised) {
        alert("MetaMask not connected")
        return
      }

      try {
        setLoading(true)

        nftContract.on("Minted", (name, symbol, tokenId, tokenURI) => {
          console.log("[event listener] Minted", {
            name,
            symbol,
            tokenId: tokenId.toNumber(),
            tokenURI,
          })
        })

        marketplaceContract.on(
          "MarketItemCreated",
          (itemId, nftAddress, tokenId, price, seller) => {
            console.log("[event listener] MarketItemCreated", {
              itemId: itemId.toString(),
              nftAddress,
              tokenId: tokenId.toString(),
              price,
              seller,
            })
          }
        )

        await (await nftContract.mint(uri)).wait()

        const currTokenId = await nftContract.getCurrentId()
        console.log("currTokenId: " + currTokenId)

        await (
          await marketplaceContract.createMarketItem(
            NFTContractData.address,
            currTokenId,
            toWei(1)
          )
        ).wait()

        nftContract.removeAllListeners("Minted")
        marketplaceContract.removeAllListeners("MarketItemCreated")

        setLoading(false)
      } catch (error) {
        console.log("[NFT minting error]", error)
      }
    },
    [ethersInitialised, nftContract, marketplaceContract]
  )

  return (
    <Flex direction="column" bg="gray.100" p={12} rounded="md">
      <Heading align="center">Mint NFT</Heading>
      <Input type="file" />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
        variant="filled"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        variant="filled"
      />
      <Input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        variant="filled"
      />
      <Button
        onClick={() => mintAndList("Sample URI")}
        isLoading={loading}
        colorScheme="teal"
      >
        Mint!
      </Button>
    </Flex>
  )
}

export default MintForm

import { useState, useCallback } from "react"
import { create as ipfsHttpClient } from "ipfs-http-client"
import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import { useWeb3Context } from "../../contexts/Web3Context"
import { NFTContractData } from "../../contractData"

const MintForm = () => {
  const web3Context = useWeb3Context()
  const { nftContract, marketplaceContract } = web3Context.contracts
  const { ethersInitialised } = web3Context.interface
  const { toWei } = web3Context.functions

  const [image, setImage] = useState()
  const [price, setPrice] = useState()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const mint = useCallback(async () => {
    if (typeof window.ethereum.isMetaMask === undefined) {
      alert("MetaMask not detected")
      return
    }

    if (!ethersInitialised) {
      alert("MetaMask not connected")
      return
    }

    try {
      setLoading(true)
      await (await nftContract.mint(uri)).wait()

      const tokenId = await nft.getCurrentId()

      await (
        await marketplaceContract.createMarketItem(
          NFTContractData.address,
          tokenId,
          toWei(price)
        )
      ).wait()
    } catch (error) {
      console.log("[NFT minting error]", error)
    }
  }, [ethersInitialised, nftContract, marketplaceContract, toWei, price])

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
      <Button onClick={mint} colorScheme="teal">
        Mint!
      </Button>
    </Flex>
  )
}

export default MintForm

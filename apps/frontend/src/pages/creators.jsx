import { Button, Heading, Flex, Input, Text } from "@chakra-ui/react"
import { useState } from "react"
import { useWeb3Context } from "../contexts/Web3Context"
import ConnectWalletButton from "src/components/ui/ConnectWalletButton"

const Creators = () => {
  const web3Context = useWeb3Context()
  const { nftContract } = web3Context.contracts.nft
  const { ethersInitialised } = web3Context.interface

  const [bal, setBal] = useState("")
  const [uri, setUri] = useState("")
  const [msg, setMsg] = useState("")

  // if (typeof window !== undefined ) {
  //   if (ethersInitialised && typeof window.ethereum.isMetaMask !== undefined) {
  //     nftContract.on("Minted", (name, symbol, tokenId, tokenURI) => {
  //       console.log({
  //         name: name,
  //         symbol: symbol,
  //         tokenId: tokenId,
  //         tokenURI: tokenURI,
  //       })
  //     })
  //   }
  // }

  const mint = async () => {
    if (typeof window.ethereum.isMetaMask === undefined) {
      alert("MetaMask not detected")
      return
    }

    if (!ethersInitialised) {
      alert("MetaMask not connected")
      return
    }

    try {
      await (await nftContract.mint(uri)).wait()
    } catch (error) {
      console.log("NFT minting error: " + error)
    }
  }

  return (
    <Flex
      h="100vh"
      w="100vw"
      align="center"
      justify="center"
      direction="column"
    >
      <ConnectWalletButton />
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Mint NFT
        </Heading>
        <Input placeholder="Collection name" variant="filled" mb={3} />
        <Input placeholder="Collection Symbol" variant="filled" mb={6} />
        <Input
          value={uri}
          onChange={(e) => setUri(e.target.value)}
          placeholder="URI"
          variant="flushed"
          mb={6}
        />
        <Button onClick={mint} colorScheme="teal" mb={6}>
          Mint!
        </Button>
        <Text>{"NFT balance: " + bal}</Text>
        <Text>{"NFT message: " + msg}</Text>
      </Flex>
    </Flex>
  )
}

export default Creators

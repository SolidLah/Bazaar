import { Button, Heading, Flex, Input, Text } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useWeb3Context } from "../contexts/Web3Context"
import ConnectWalletButton from "src/components/ui/ConnectWalletButton"

const Creators = () => {
  const web3Context = useWeb3Context()
  const { nftContract } = web3Context.contracts
  const { ethersInitialised } = web3Context.interface

  const [uri, setUri] = useState("")
  const [msg, setMsg] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!ethersInitialised) {
      console.log("[event listener] ethers not initialised")
      return
    }

    console.log("[event listener] effect")

    nftContract.on("Minted", (name, symbol, tokenId, tokenURI) => {
      console.log("[event listener] event picked up", {
        name: name,
        symbol: symbol,
        tokenId: tokenId.toString(),
        tokenURI: tokenURI,
      })

      setMsg(tokenURI)
      setUri("")
      setLoading(false)
    })

    return () => {
      console.log("[event listener] cleanup")
      nftContract.removeAllListeners("Minted")
    }
  }, [ethersInitialised])

  const mint = async () => {
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
      await (await nftContract.mint(uri)).wait()
    } catch (error) {
      console.log("[NFT minting error]", error)
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
      <Flex mb={3}>
        <ConnectWalletButton />
      </Flex>
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
        <Button onClick={mint} isLoading={loading} colorScheme="teal" mb={6}>
          Mint!
        </Button>
        <Text>{"NFT message: " + msg}</Text>
      </Flex>
    </Flex>
  )
}

export default Creators

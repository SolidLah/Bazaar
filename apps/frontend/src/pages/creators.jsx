import { Button, Heading, Flex, Input, Text } from "@chakra-ui/react"
import { CONTRACT_ADDRESS, ABI } from "../web3"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { useWeb3Context } from "../contexts/Web3Context"

const Creators = () => {
  const { nftContract, setNftContract } = useWeb3Context().contracts.nft
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")

  useEffect(() => {
    if (!window.ethereum) {
      console.log("No metamask")
      return
    }

    const connectWallet = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])

        const read = new ethers.Contract(CONTRACT_ADDRESS, ABI, provider)

        console.log("connectWallet function called")

        setNftContract(read)
        return
      } catch (error) {
        console.log(error)
        return
      }
    }

    connectWallet()
  }, [setNftContract])

  const updateData = async () => {
    if (nftContract) {
      const name = await nftContract.name()
      const symbol = await nftContract.symbol()

      setName(name)
      setSymbol(symbol)

      console.log("updateData function called")
    } else {
      console.log("read function not ready")
    }
  }

  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Mint NFT
        </Heading>
        <Input placeholder="Collection name" variant="filled" mb={3} />
        <Input placeholder="Collection Symbol" variant="filled" mb={6} />
        <Input placeholder="URI" variant="flushed" mb={6} />
        <Button onClick={updateData} colorScheme="teal" mb={6}>
          Mint!
        </Button>
        <Text>{"name: " + name}</Text>
        <Text>{"symbol: " + symbol}</Text>
      </Flex>
    </Flex>
  )
}

export default Creators

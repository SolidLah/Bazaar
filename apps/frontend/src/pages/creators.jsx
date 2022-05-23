import { Button, Heading, Flex, Input, Text } from "@chakra-ui/react"
import { CONTRACT_ADDRESS, ABI } from "../contractData"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { useWeb3Context } from "../contexts/Web3Context"

const Creators = () => {
  const web3Context = useWeb3Context()
  const { nftContract, setNftContract } = web3Context.contracts.nft
  const { signer } = web3Context.interface
  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")

  const mint = async () => {
    if (window.ethereum.isMetaMask !== undefined) {
      if (!signer) {
        alert("Please connect to metamask")
        return
      }

      try {
        let tmpContract

        if (nftContract) {
          tmpContract = nftContract
        } else {
          tmpContract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer)
          setNftContract(tmpContract)
        }

        const data = await tmpContract.mint("Sample URI")

        console.log(data)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("MetaMask not detected")
    }
  }

  useEffect(() => {
    const updateData = async () => {
      if (nftContract) {
        try {
          const name = await nftContract.name()
          const symbol = await nftContract.symbol()

          setName(name)
          setSymbol(symbol)
        } catch (error) {
          console.log("Error: " + error.name)
        }
      }
    }

    updateData()
  }, [nftContract])

  return (
    <Flex h="100vh" w="100vw" align="center" justify="center">
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Mint NFT
        </Heading>
        <Input placeholder="Collection name" variant="filled" mb={3} />
        <Input placeholder="Collection Symbol" variant="filled" mb={6} />
        <Input placeholder="URI" variant="flushed" mb={6} />
        <Button onClick={mint} colorScheme="teal" mb={6}>
          Mint!
        </Button>
        <Text>{"name: " + name}</Text>
        <Text>{"symbol: " + symbol}</Text>
      </Flex>
    </Flex>
  )
}

export default Creators

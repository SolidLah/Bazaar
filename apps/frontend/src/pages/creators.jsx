import { Button, Heading, Flex, Input, Text } from "@chakra-ui/react"
import { NFTContractData } from "../contractData"
import { ethers } from "ethers"
import { useState, useEffect } from "react"
import { useWeb3Context } from "../contexts/Web3Context"

const Creators = () => {
  const web3Context = useWeb3Context()
  const { nftContract, setNftContract } = web3Context.contracts.nft
  const { signer } = web3Context.interface

  const [bal, setBal] = useState("")
  const [uri, setUri] = useState("")
  const [msg, setMsg] = useState("")

  // tmpContract.on("Minted", (name, symbol, tokenId, tokenURI) => {
  //   console.log({
  //     name: name,
  //     symbol: symbol,
  //     tokenId: tokenId,
  //     tokenURI: tokenURI,
  //   })

  //   const main = async () => {
  //     console.log("main called")
  //     const currBal = await tmpContract.balanceOf(currentAddress)
  //     const currMsg = tokenURI

  //     setNftContract(tmpContract)
  //     setBal(currBal.toString())
  //     setMsg(currMsg)
  //   }

  //   main()
  // })

  const mint = async () => {
    if (typeof window.ethereum.isMetaMask !== undefined) {
      if (!signer) {
        alert("Please connect to metamask")
        return
      }

      try {
        let tmpContract

        if (nftContract) {
          tmpContract = nftContract
        } else {
          tmpContract = new ethers.Contract(
            NFTContractData.address,
            NFTContractData.abi,
            signer
          )

          setNftContract(tmpContract)
        }

        await tmpContract.mint(uri)
      } catch (error) {
        console.log(error)
      }
    } else {
      console.log("MetaMask not detected")
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

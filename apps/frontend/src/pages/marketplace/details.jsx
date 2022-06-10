import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Flex,
  Button,
  Spacer,
  useToast,
} from "@chakra-ui/react"
import Image from "next/image"
import { useCallback } from "react"
import { useWeb3Context } from "src/contexts/Web3Context"

const DetailsBox = () => {
  const { state } = useWeb3Context()
  const { ethersInitialised, mktContract } = state

  const toast = useToast()

  const buttonCallback = useCallback(
    async ({ mktContract }) => {
      if (typeof window.ethereum === "undefined") {
        toast({
          title: "Metamask",
          description: "Metamask is not installed!",
          status: "error",
          isClosable: true,
          position: "bottom-right",
        })
        return
      }

      if (!ethersInitialised) {
        toast({
          title: "Metamask",
          description: "Connect a Metamask wallet!",
          status: "error",
          isClosable: true,
          position: "bottom-right",
        })
        return
      }

      // get tokenId and call purchase function
      await mktContract
    },
    [ethersInitialised, mktContract]
  )

  return (
    <VStack w="md" h="100%" direction="column" alignItems="start" bg="red">
      <Flex
        w="md"
        direction="column"
        bg="gray.100"
        borderRadius="0.5rem"
        p="0.7rem"
      >
        <Heading>NFT name</Heading>
        <Text>NFT collection</Text>
        <Text>NFT minter</Text>
      </Flex>
      <Text>NFT Description</Text>
      <Spacer />
      <Button colorScheme="teal" onClick={buttonCallback}>
        Buy
      </Button>
    </VStack>
  )
}

const Details = () => {
  return (
    <VStack w="100%" p={10}>
      <HStack w="100%" justify="space-around" align="start">
        <Box w="xl" h="xl" pos="relative">
          <Image
            src="https://gateway.pinata.cloud/ipfs/QmddQwKp51S5JXC4wiNEZxYLBkQjq3L3k9UizWAj3RqSAd"
            alt="NFT here"
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <DetailsBox />
      </HStack>
    </VStack>
  )
}

export default Details

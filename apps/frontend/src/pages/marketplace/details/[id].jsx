import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Flex,
  Spacer,
  Spinner,
} from "@chakra-ui/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import BuyButton from "src/components/ui/BuyButton"

const Details = () => {
  const router = useRouter()
  const { id } = router.query

  const [item, setItem] = useState()
  const [loading, setLoading] = useState("")

  useEffect(() => {
    const getItemDetails = async () => {
      setLoading("loading")

      let itemRes

      console.log(id)

      try {
        itemRes = (await axios.get(`/api/listings/${id}`)).data.msg

        setItem(itemRes)
        setLoading("")
      } catch (error) {
        console.log(error)
        setLoading("error")
      }
    }

    getItemDetails()
  }, [])

  if (loading === "loading") {
    return <Spinner size="xl" />
  }

  if (loading === "error") {
    return <div>Error has occured</div>
  }

  return (
    <VStack w="100%" p={10}>
      <HStack w="100%" justify="space-around" align="start">
        <Box w="xl" h="xl" pos="relative">
          <Image
            src={item.nftData.image}
            alt="NFT here"
            layout="fill"
            objectFit="contain"
          />
        </Box>
        <VStack w="md" h="100%" direction="column" alignItems="start" bg="red">
          <Flex
            w="md"
            direction="column"
            bg="gray.100"
            borderRadius="0.5rem"
            p="0.7rem"
          >
            <Heading>{item.nftData.name}</Heading>
            <Text>NFT collection</Text>
            <Text>NFT minter</Text>
          </Flex>
          <Text>{item.nftData.description}</Text>
          <Spacer />
          <BuyButton item={item} />
        </VStack>
      </HStack>
    </VStack>
  )
}

export default Details

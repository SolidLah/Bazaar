import {
  Box,
  Heading,
  HStack,
  Text,
  VStack,
  Flex,
  Spacer,
  Spinner,
  Center,
} from "@chakra-ui/react"
import Image from "next/image"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import axios from "axios"
import BuyButton from "src/components/ui/BuyButton"
import useSWR from "swr"

const Details = () => {
  const router = useRouter()
  const { id } = router.query

  const { data, error } = useSWR(`/api/listings/${id}`, (url) =>
    axios.get(url).then((res) => res.data.msg)
  )

  const [item, setItem] = useState()

  useEffect(() => {
    setItem(data)
  }, [data])

  if (!item) {
    return (
      <Center h="100%" p={10}>
        <Spinner size="xl" color="gray" />
      </Center>
    )
  }

  if (error) {
    return (
      <Center h="100%" p={10}>
        <div>Error has occured</div>
      </Center>
    )
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

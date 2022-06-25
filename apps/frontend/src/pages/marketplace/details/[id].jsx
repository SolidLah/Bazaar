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
  Badge,
} from "@chakra-ui/react"
import Image from "next/image"
import { useRouter } from "next/router"
import axios from "axios"
import BuyButton from "src/components/ui/BuyButton"
import useSWR from "swr"

const Details = () => {
  const router = useRouter()
  const { id } = router.query

  const { data: item, error } = useSWR(`/api/listings/${id}`, (url) =>
    axios.get(url).then((res) => res.data.msg)
  )

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
        <VStack w="md" h="100%" direction="column" alignItems="start">
          <Flex w="md" bg="gray.100" borderRadius="0.5rem" p="0.7rem">
            <Flex w="100%" direction="column">
              <Heading>{item.nftData.name}</Heading>
              <Text>NFT collection</Text>
              <Text>
                {`${item.marketData[4].slice(0,3)}...${item.marketData[4].slice(38)}`}
              </Text>
            </Flex>
            <Badge
              alignSelf="start"
              colorScheme="green"
              variant="subtle"
              fontSize={17}
            >{`${item.marketPrice.display} MATIC`}</Badge>
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

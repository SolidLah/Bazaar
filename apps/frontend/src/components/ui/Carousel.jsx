import { Flex } from "@chakra-ui/react"
import Card from "./Card"

const Carousel = ({ items }) => {
  return (
    <Flex w="100%" h="100%" wrap="wrap" justify="flex-start">
      {items.map((item) => {
        return <Card key={item.name} item={item} />
      })}
    </Flex>
  )
}

export default Carousel

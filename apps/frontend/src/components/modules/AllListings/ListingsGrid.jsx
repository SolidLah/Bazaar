import { Flex } from "@chakra-ui/react"
import Card from "src/components/common/ui/Card/Card"

const ListingsGrid = ({ items }) => {
  return (
    <Flex w="100%" h="100%" wrap="wrap" justify="flex-start">
      {items.map((item) => (
        <Card key={item.id} item={item} />
      ))}
    </Flex>
  )
}

export default ListingsGrid

import { Flex } from "@chakra-ui/react"
import Header from "../ui/Header"

const BaseLayout = (props) => {
  return (
    <Flex direction="column" align="center" maxW="100vw" m="0 auto" {...props}>
      <Header />
      {props.children}
    </Flex>
  )
}

export default BaseLayout

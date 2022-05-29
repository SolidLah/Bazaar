import { useWeb3Context } from "src/contexts/Web3Context"
import { listNFT } from "src/functions"
import { useState } from "react"
import { Button, Flex } from "@chakra-ui/react"

const ListForm = () => {
  const web3context = useWeb3Context()
  const { marketplaceContract } = web3context.contracts
  const [price, setPrice] = useState("")
  const [loading, setLoading] = useState(false)

  const buttonCallback = async () => {
    setLoading(true)

    await listNFT({ marketplaceContract, tokenId, price })

    setLoading(false)
  }

  return (
    <Flex direction="column">
      <Button isLoading={loading} colorScheme="teal">
        List
      </Button>
    </Flex>
  )
}

export default ListForm

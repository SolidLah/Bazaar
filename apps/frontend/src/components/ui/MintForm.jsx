import { useState, useCallback, useMemo } from "react"
import { Button, Flex, Heading, Input } from "@chakra-ui/react"
import { useWeb3Context } from "../../contexts/Web3Context"
import { mintNFT, listNFT } from "../../functions"

const MintForm = () => {
  const { state } = useWeb3Context()
  const { nftContract, mktContract, ethersInitialised } = state

  const [image, setImage] = useState()
  const [price, setPrice] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState(false)

  const payload = useMemo(() => {
    return {
      name,
      description,
      image,
    }
  }, [name, description, image])

  const buttonCallback = useCallback(async () => {
    const numPrice = Number(price)

    if (!numPrice || !name || !description) {
      alert("Missing fields")
      return
    }

    if (typeof window.ethereum === "undefined") {
      alert("MetaMask not installed!")
      return
    }

    if (!ethersInitialised) {
      alert("MetaMask not connected")
      return
    }

    setLoading(true)

    const tokenId = await mintNFT({ nftContract, uri: "Sample URI" })
    await listNFT({ mktContract, tokenId, price: numPrice })

    setLoading(false)
    setPrice("")
    setName("")
    setDescription("")
  }, [ethersInitialised, price, name, description, nftContract, mktContract])

  return (
    <Flex direction="column" bg="gray.100" p={12} rounded="md">
      <Heading align="center" mb={6}>
        Mint NFT
      </Heading>
      <Input type="file" mb={3} />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
        variant="filled"
        mb={3}
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        variant="filled"
        mb={3}
      />
      <Input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        variant="filled"
        mb={6}
      />
      <Button onClick={buttonCallback} isLoading={loading} colorScheme="teal">
        Mint
      </Button>
    </Flex>
  )
}

export default MintForm

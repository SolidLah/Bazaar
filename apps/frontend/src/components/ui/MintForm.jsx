import { useState, useCallback } from "react"
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
} from "@chakra-ui/react"
import { useWeb3Context } from "../../contexts/Web3Context"
import { mintNFT, listNFT } from "../../functions/web3"
import axios from "axios"

const MintForm = () => {
  const { state } = useWeb3Context()
  const { nftContract, mktContract, ethersInitialised } = state

  const [image, setImage] = useState(null)
  const [price, setPrice] = useState("")
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [loading, setLoading] = useState("")

  const toast = useToast()

  const getImage = (event) => {
    event.preventDefault()
    setImage(event.target.files[0])
  }

  const uploadNFT = useCallback(async () => {
    // upload image to IPFS
    let imageData = new FormData()
    imageData.append("type", "IMAGE")
    imageData.append("image", image)

    const imageUploadRes = await axios.post("/api/image", imageData)
    const imageCID = imageUploadRes.data.msg.IpfsHash
    const imageURI = "https://gateway.pinata.cloud/ipfs/" + imageCID

    // upload NFT JSON to IPFS
    const nftJSON = {
      image: imageURI,
      name,
      description,
    }

    let nftData = new FormData()
    nftData.append("type", "NFT")
    nftData.append("nftJSON", JSON.stringify(nftJSON))

    const nftUploadRes = await axios.post("/api/image", nftData)
    const nftCID = nftUploadRes.data.msg.IpfsHash
    const nftURI = "https://gateway.pinata.cloud/ipfs/" + nftCID

    return nftURI
  }, [image, name, description])

  const buttonCallback = useCallback(async () => {
    const numPrice = Number(price)

    if (!image || !numPrice || !name || !description) {
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

    setLoading("Uploading Image")

    // upload image then NFT to IPFS
    let nftURI

    try {
      nftURI = await uploadNFT()
    } catch (error) {
      toast({
        title: "Minting status",
        description: "Error occured",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      })
      setLoading("")
      return
    }

    setLoading("Minting NFT")

    // mint and list NFT
    try {
      const tokenId = await mintNFT({ nftContract, uri: nftURI })
      await listNFT({ mktContract, tokenId, price: numPrice })
    } catch (error) {
      toast({
        title: "Minting status",
        description: "Error occured",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      })
      setLoading("")
      return
    }

    setLoading("")
    setName("")
    setDescription("")
    setPrice("")

    toast({
      title: "Minting status",
      description: "Minting success!",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    })
  }, [
    ethersInitialised,
    image,
    name,
    description,
    uploadNFT,
    price,
    nftContract,
    mktContract,
  ])

  return (
    <Flex direction="column" bg="gray.100" p={12} rounded="md">
      <Heading align="center" mb={6}>
        Mint NFT
      </Heading>
      <Input type="file" onChange={getImage} mb={3} />
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
      <InputGroup>
        <Input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="price"
          variant="filled"
          mb={6}
        />
        <InputRightAddon color="gray.500" bg="gray.200" children="MATIC" />
      </InputGroup>
      <Button
        onClick={buttonCallback}
        isLoading={loading !== ""}
        loadingText={loading}
        colorScheme="teal"
      >
        Mint
      </Button>
    </Flex>
  )
}

export default MintForm
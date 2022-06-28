import { useState, useCallback, useRef } from "react"
import {
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputRightAddon,
  useToast,
  Center,
} from "@chakra-ui/react"
import axios from "axios"
import ConnectWalletButton from "src/components/common/ui/ConnectWalletButton"
import useEthersStore from "src/stores/ethersStore"
import { ethers } from "ethers"
import { NFTContractData } from "src/contracts"

const MintForm = () => {
  const ethersInitialised = useEthersStore((state) => state.ethersInitialised)
  const nftContract = useEthersStore((state) => state.nftContract)
  const mktContract = useEthersStore((state) => state.mktContract)

  const imageRef = useRef()
  const nameRef = useRef()
  const descriptionRef = useRef()
  const priceRef = useRef()
  const [loading, setLoading] = useState("")

  const toast = useToast()

  const toWei = (num) => ethers.utils.parseEther(num.toString())

  const uploadNFT = async (image, name, description) => {
    // initialise FormData object
    let imageData = new FormData()
    imageData.append("image", image)
    imageData.append("name", name)
    imageData.append("description", description)

    // POST request to API
    const imageUploadRes = await axios.post("/api/image", imageData)
    const nftURI = imageUploadRes.data.msg

    return nftURI
  }

  const buttonCallback = useCallback(async () => {
    const image = imageRef.current?.files[0]
    const name = nameRef.current?.value
    const description = descriptionRef.current?.value
    const price = Number(priceRef.current?.value)

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

    if (!image || !price || !name || !description) {
      toast({
        title: "Form",
        description: "Missing fields",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      })
      return
    }

    setLoading("Uploading Image")

    // upload image then NFT to IPFS
    let nftURI

    try {
      nftURI = await uploadNFT(image, name, description)
      console.log("upload to IPFS: success")
    } catch (error) {
      toast({
        title: "Minting status",
        description: "Error occured uploading NFT",
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
      // mint NFT
      await (await nftContract.mint(nftURI)).wait()
      console.log("await mintNFT done")

      // get tokenId
      const tokenId = await nftContract.getCurrentId()
      console.log(`current tokenId: ${tokenId.toString()}`)

      // list NFT
      await (
        await mktContract.createMarketItem(
          NFTContractData.address,
          tokenId,
          toWei(price)
        )
      ).wait()
      console.log("list on marketplace: success")
    } catch (error) {
      toast({
        title: "Minting status",
        description: "Error occured minting NFT",
        status: "error",
        isClosable: true,
        position: "bottom-right",
      })
      setLoading("")
      return
    }

    imageRef.current.value = ""
    nameRef.current.value = ""
    descriptionRef.current.value = ""
    priceRef.current.value = ""
    setLoading("")

    toast({
      title: "Minting status",
      description: "Minting success!",
      status: "success",
      isClosable: true,
      position: "bottom-right",
    })
  }, [ethersInitialised, nftContract, mktContract])

  return (
    <Center h="100%" w="100%" p={10} flexDirection="column">
      <ConnectWalletButton mb={3} />
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading align="center" mb={6}>
          Mint NFT
        </Heading>
        <Input ref={imageRef} type="file" mb={3} />
        <Input ref={nameRef} placeholder="name" variant="filled" mb={3} />
        <Input
          ref={descriptionRef}
          placeholder="description"
          variant="filled"
          mb={3}
        />
        <InputGroup>
          <Input ref={priceRef} placeholder="price" variant="filled" mb={6} />
          <InputRightAddon
            color="gray.500"
            bg="gray.200"
            fontSize={13}
            fontWeight="bold"
          >
            MATIC
          </InputRightAddon>
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
    </Center>
  )
}

export default MintForm

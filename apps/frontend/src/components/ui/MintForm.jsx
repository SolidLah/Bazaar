import { useState, useCallback } from "react"
import { create as ipfsHttpClient } from "ipfs-http-client"
import { Button, Flex, Heading, Input } from "@chakra-ui/react"

const INFURA_IPFS_ID = process.env.INFURA_IPFS_ID
const INFURA_IPFS_SECRET = process.env.INFURA_IPFS_SECRET

const auth = "Basic " + Buffer.from(INFURA_IPFS_ID + ":" + INFURA_IPFS_SECRET).toString("base64")

let client

try {
  client = ipfsHttpClient({
    url: "https://ipfs.infura.io:5001/api/v0",
    headers: { authorization: auth },
  })
} catch (error) {
  console.log("[IPFS connection]", error)
  client = undefined
}

const MintForm = () => {
  const [image, setImage] = useState()
  const [price, setPrice] = useState()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")

  const uploadImageToIPFS = async (event) => {
    event.preventDefault()

    const isOnline = await client.isOnline()

    if (isOnline) {
      console.log("[uploadImageToIPFS] client offline")
      return
    }

    const file = event.target.files[0]

    if (typeof file !== undefined) {
      try {
        const imgRes = await client.add("hi")
        const imgPath = imgRes.path

        setImage(imgPath)
      } catch (error) {
        console.log("[uploadImageToIPFS]", error)
        return
      }
    }
  }

  const uploadMetaToIPFS = useCallback(async () => {
    if (!image || !name || !description) {
      console.log("[uploadMetaToIPFS] missing fields")
    }

    const metaRes = await client.add(
      JSON.stringify({ imgPath, name, description })
    )
    console.log(metaRes.path)
  }, [client, image, name, description])

  return (
    <Flex direction="column" bg="gray.100" p={12} rounded="md">
      <Heading align="center">Mint NFT</Heading>
      <Input type="file" onChange={uploadImageToIPFS} />
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="name"
        variant="filled"
      />
      <Input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="description"
        variant="filled"
      />
      <Input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="price"
        variant="filled"
      />
      <Button onClick={uploadMetaToIPFS} colorScheme="teal">
        upload
      </Button>
    </Flex>
  )
}

export default MintForm

import { Center, Button, Input, Text } from "@chakra-ui/react"
import axios from "axios"
import { useState, useCallback } from "react"

function Pinata({ message }) {
  const [image, setImage] = useState()

  const getImage = (event) => {
    event.preventDefault()
    setImage(event.target.files[0])
  }

  const buttonCallback = useCallback(() => {
    let formData = new FormData()
    formData.append("image", image)
    axios.post("/api/image", formData).then(console.log).catch(console.log)
  }, [image])

  return (
    <Center flexDirection="column">
      <Text>{message ? message : "not authed"}</Text>
      <Input type="file" name="file" onChange={getImage} />
      <Button onClick={buttonCallback}>Upload</Button>
    </Center>
  )
}

export default Pinata

export async function getServerSideProps() {
  const testAuthURL = "https://api.pinata.cloud/data/testAuthentication"
  const data = await (
    await fetch(testAuthURL, {
      headers: {
        pinata_api_key: process.env.PINATA_API_KEY,
        pinata_secret_api_key: process.env.PINATA_API_SECRET,
      },
    })
  ).json()

  const { message } = data

  return { props: { message } }
}

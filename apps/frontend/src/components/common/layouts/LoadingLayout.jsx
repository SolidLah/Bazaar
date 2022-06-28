import { Center, Spinner } from "@chakra-ui/react"

const LoadingLayout = () => {
  return (
    <Center p={10}>
      <Spinner size="xl" />
    </Center>
  )
}
export default LoadingLayout

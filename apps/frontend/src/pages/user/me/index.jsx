import { Center, Spinner } from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useRouter } from "next/router"
import { db, auth } from "src/firebase"
import { doc, getDoc } from "firebase/firestore"
import { useEffect } from "react"
import useSWR from "swr"
import axios from "axios"
import DetailsGrid from "src/components/modules/user/DetailsGrid"
import ListingsAndBalance from "src/components/modules/user/ListingsAndBalance"
import ErrorLayout from "src/components/layouts/ErrorLayout"

const Me = () => {
  const [user, loading, authError] = useAuthState(auth)
  const router = useRouter()
  const { data: storedAddress } = useSWR(user, (user) =>
    getDoc(doc(db, "users", user.uid)).then((res) => res.data().walletAddress)
  )

  const { data: userItems } = useSWR(
    () => (storedAddress ? "/api/listings/user/" + storedAddress : null),
    (url) => axios.get(url).then((res) => res.data.msg)
  )

  useEffect(() => {
    if (!user) {
      router.push("/user/login")
    }
  }, [user])

  if (authError) {
    return <ErrorLayout />
  }

  return (
    <Center w="100%" flexDirection="column" mt={20} mb={200} gap={10}>
      {user !== undefined && storedAddress !== undefined ? (
        <>
          <DetailsGrid user={user} fireStoredAddress={storedAddress} />
          <ListingsAndBalance items={userItems} />
        </>
      ) : (
        <Spinner size="xl" color="gray" />
      )}
    </Center>
  )
}

export default Me

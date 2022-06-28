import { Center, Spinner } from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth"
import { db, auth } from "lib/firebase"
import { doc, getDoc } from "firebase/firestore"
import useSWR from "swr"
import axios from "axios"
import DetailsGrid from "src/components/modules/UserProfile/DetailsGrid"
import ListingsAndBalance from "src/components/modules/UserProfile/ListingsAndBalance"
import ErrorLayout from "src/components/common/layouts/ErrorLayout"

const UserProfile = () => {
  const [user, loading, authError] = useAuthState(auth)

  const { data: storedAddress } = useSWR(user, (user) =>
    getDoc(doc(db, "users", user.uid)).then((res) => res.data().walletAddress)
  )

  const { data: userItems } = useSWR(
    () => (storedAddress ? "/api/listings/user/" + storedAddress : null),
    (url) => axios.get(url).then((res) => res.data.msg)
  )

  if (authError) {
    return <ErrorLayout />
  }

  return (
    <Center w="100%" flexDirection="column" mt={20} mb={200} gap={10}>
      {user && storedAddress ? (
        <DetailsGrid user={user} fireStoredAddress={storedAddress} />
      ) : (
        <Spinner size="xl" color="gray" />
      )}
      {userItems ? (
        <ListingsAndBalance items={userItems} />
      ) : (
        <Spinner size="xl" color="gray" />
      )}
    </Center>
  )
}

export default UserProfile

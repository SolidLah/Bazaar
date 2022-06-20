import { Center, Spinner, Text, Flex, Heading } from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useRouter } from "next/router"
import { auth, db } from "../functions/firebase"
import { useEffect, useState } from "react"
import ConnectWalletToAccountButton from "src/components/ui/ConnectWalletToAccountButton"

const Me = () => {
  const [user, loading, error] = useAuthState(auth)
  const router = useRouter()
  const [userObj, setUserObj] = useState(null)
  const [hasAccess, setHasAccess] = useState(false)

  useEffect(() => {
    if (loading) {
      return
    }

    if (!user) {
      router.push("/login")
    }
  }, [user, loading])

  useEffect(() => {
    const getUser = async () => {
      if (!user) {
        return
      }

      const q = query(collection(db, "users"), where("uid", "==", user.uid))
      const res = await getDocs(q)
      let tmpObj

      
      res.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        tmpObj = doc.data()
      })

      

      setUserObj(tmpObj)
      setHasAccess(true)
    }

    getUser()
  }, [user, hasAccess])

  if (!hasAccess) {
    return (
      <Center h="100vh" w="100vw">
        <Spinner size="xl" />
      </Center>
    )
  }

  return (
    <>
    <Text>
      {userObj ? "User Details: " + JSON.stringify(userObj, undefined, 2) : "no user found"}
    </Text>
    <Flex p={10} justify="center">
      <Heading> 
        First name: {user.displayName}
      </Heading>
      <Heading>
        Email: {user.email}
      </Heading>
        <ConnectWalletToAccountButton />
    </Flex>
    </>
  )
}

export default Me

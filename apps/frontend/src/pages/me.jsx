import { Spinner, Text } from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth"
import { collection, query, where, getDocs } from "firebase/firestore"
import { useRouter } from "next/router"
import { auth, db } from "../firebase"
import { useEffect, useState } from "react"

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
        tmpObj = doc.data()
      })

      setUserObj(tmpObj)
      setHasAccess(true)
    }

    getUser()
  }, [user, hasAccess])

  if (!hasAccess) {
    return <Spinner />
  }

  return <Text>{`Hey there ${userObj ? userObj.name : ""}!`}</Text>
}

export default Me

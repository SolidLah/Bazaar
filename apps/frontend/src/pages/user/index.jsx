import { auth } from "lib/firebase"
import { useAuthState } from "react-firebase-hooks/auth"
import LoginForm from "src/components/modules/LoginForm"
import UserProfile from "src/components/modules/UserProfile"

const User = () => {
  const [user, loading, error] = useAuthState(auth)

  return user ? <UserProfile /> : <LoginForm />
}

export default User

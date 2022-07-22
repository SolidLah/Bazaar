import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { useState } from "react";
import { auth } from "src/lib/firebase";
import { useToastedCallback } from "src/lib/hooks";

const useComponentState = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    if (!email || !password) throw new Error("Missing fields");

    await signInWithEmailAndPassword(auth, email, password);

    setEmail("");
    setPassword("");

    if (router.query && router.query.from) {
      router.push(router.query.from);
    } else {
      router.push(`/user/${auth.currentUser.uid}`);
    }
  };

  const { toastedCallback, loading } = useToastedCallback("Login", login);

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  return {
    email,
    handleEmail,
    password,
    handlePassword,
    toastedCallback,
    loading,
  };
};

export default useComponentState;

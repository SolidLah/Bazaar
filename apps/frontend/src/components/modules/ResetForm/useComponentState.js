import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { auth } from "src/lib/firebase";
import { useToastedCallback } from "src/lib/hooks";

const useComponentState = () => {
  const [email, setEmail] = useState("");

  const reset = async () => {
    if (!email) throw new Error("Missing field");

    await sendPasswordResetEmail(auth, email);

    setEmail("");
  };

  const { toastedCallback, loading } = useToastedCallback(
    "Reset password",
    reset
  );

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  return { email, handleEmail, toastedCallback, loading };
};
export default useComponentState;

import { useState } from "react";
import { signupWithEmailAndPassword } from "src/lib/firebase";
import {
  useFetchUserFromWalletAddress,
  useToastedCallback,
} from "src/lib/hooks";
import useEthersStore from "src/stores/ethersStore";

const useComponentState = () => {
  const walletAddress = useEthersStore((state) => state.address);
  const { data: addressInUse } = useFetchUserFromWalletAddress(walletAddress);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const signup = async () => {
    if (!email || !name || !password || !confirm || !walletAddress)
      throw new Error("Missing fields");
    if (password !== confirm) throw new Error("Passwords do not match");
    if (addressInUse) throw new Error("Address is already used");

    await signupWithEmailAndPassword(name, email, password, walletAddress);

    setEmail("");
    setName("");
    setPassword("");
    setConfirm("");
  };

  const { toastedCallback, loading } = useToastedCallback("Sign up", signup);

  const handleEmail = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handlePassword = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setConfirm(e.target.value);
  };

  return {
    name,
    handleName,
    email,
    handleEmail,
    password,
    handlePassword,
    confirm,
    handleConfirm,
    toastedCallback,
    loading,
  };
};

export default useComponentState;

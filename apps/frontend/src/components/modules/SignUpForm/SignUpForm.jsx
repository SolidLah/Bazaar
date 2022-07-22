import { Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import PasswordInput from "src/components/common/ui/PasswordInput/PasswordInput";
import WalletHandlerButton from "src/components/common/ui/WalletHandlerButton/WalletHandlerButton";
import { signupWithEmailAndPassword } from "src/lib/firebase";
import { useToastedCallback } from "src/lib/hooks";
import useFetchUserFromWalletAddress from "src/lib/hooks/useFetchUserFromWalletAddress";
import useEthersStore from "src/stores/ethersStore";

const SignupForm = () => {
  const walletAddress = useEthersStore((state) => state.address);
  const { data: addressInUse } = useFetchUserFromWalletAddress(walletAddress);
  console.log(walletAddress, addressInUse);

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

  const handleEmail = (e) => setEmail(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleConfirm = (e) => setConfirm(e.target.value);

  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="md">
        <Heading mb={6} align="center">
          Sign Up
        </Heading>
        <Input
          value={name}
          onChange={handleName}
          placeholder="name"
          variant="filled"
          mb={3}
        />
        <Input
          value={email}
          onChange={handleEmail}
          type="email"
          placeholder="email"
          variant="filled"
          mb={3}
        />
        <PasswordInput
          value={password}
          onChange={handlePassword}
          placeholder="password"
          variant="filled"
          mb={3}
        />
        <PasswordInput
          value={confirm}
          onChange={handleConfirm}
          placeholder="confirm password"
          variant="filled"
          mb={3}
        />
        <WalletHandlerButton mb={6} bg="gray.300" />
        <Button
          colorScheme="purple"
          mb={6}
          onClick={toastedCallback}
          isLoading={loading}
        >
          Sign Up
        </Button>
        <Link href="/user/login" passHref>
          <Button variant="link" size="sm">
            Log In
          </Button>
        </Link>
      </Flex>
    </Center>
  );
};

export default SignupForm;

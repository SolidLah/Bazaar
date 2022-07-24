import { Button, Center, Flex, Heading, Input } from "@chakra-ui/react";
import Link from "next/link";
import PasswordInput from "src/components/common/ui/PasswordInput/PasswordInput";
import WalletHandlerButton from "src/components/common/ui/WalletHandlerButton/WalletHandlerButton";

const ComponentView = ({
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
}) => {
  return (
    <Center mt={20}>
      <Flex direction="column" bg="gray.100" p={12} rounded="xl">
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

export default ComponentView;

import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useUpdateEmail } from "react-firebase-hooks/auth";
import { auth } from "src/lib/firebase";
import { updateUserDetail } from "src/lib/helpers";
import { useErrorToast, useSuccessToast } from "src/lib/hooks";

const EmailComponent = ({ uid, current }) => {
  const [updateEmail, , error] = useUpdateEmail(auth);
  const errorToast = useErrorToast("Update email");
  const successToast = useSuccessToast("Update email");

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const callBack = async () => {
    setLoading(true);

    try {
      if (!email) throw new Error("Missing field");
      if (email === current) throw new Error("Same as current");
      if (error) throw error;

      await updateEmail(email);
      await updateUserDetail(uid, { email });
      successToast();
      setEmail("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      errorToast({
        description: error.message,
      });
      setLoading(false);
    }
  };

  return (
    <Flex direction="column" gap={1} w="md">
      <Heading size="md" mb={1}>
        Email
      </Heading>
      <Text>Current: {current}</Text>
      <Flex justify="space-between">
        <Input
          placeholder="new email"
          w="2xs"
          onChange={handleChange}
          value={email}
        />
        <Button
          colorScheme="purple"
          onClick={callBack}
          w="max-content"
          isLoading={loading}
        >
          Change
        </Button>
      </Flex>
    </Flex>
  );
};

export default EmailComponent;

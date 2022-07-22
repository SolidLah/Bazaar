import { Button, Flex, Heading, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { updateUserDetail } from "src/lib/helpers";
import { useErrorToast, useSuccessToast } from "src/lib/hooks";

const NameComponent = ({ uid, current }) => {
  const errorToast = useErrorToast("Update name");
  const successToast = useSuccessToast("Update name");

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const callBack = async () => {
    setLoading(true);

    try {
      if (!name) throw new Error("Missing field");
      if (name === current) throw new Error("Same as current");

      await updateUserDetail(uid, { name });
      successToast();
      setName("");
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
        Name
      </Heading>
      <Text>Current: {current}</Text>
      <Flex justify="space-between">
        <Input
          placeholder="new name"
          w="2xs"
          onChange={handleChange}
          value={name}
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

export default NameComponent;

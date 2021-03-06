import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";

const PasswordInput = (props) => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow((initial) => !initial);

  return (
    <InputGroup>
      <Input role="input" type={show ? "text" : "password"} {...props} />
      <InputRightElement w="max-content" px="0.5rem">
        <Button
          h="1.75rem"
          size="sm"
          textColor="blackAlpha.700"
          onClick={handleShow}
        >
          {show ? "Hide" : "Show"}
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default PasswordInput;

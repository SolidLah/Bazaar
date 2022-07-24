import { Container, Text } from "@chakra-ui/react";

const ErrorLayout = ({ message }) => {
  return (
    <Container mt={20} centerContent>
      <Text>{message ?? "Error has occurred..."}</Text>
    </Container>
  );
};

export default ErrorLayout;

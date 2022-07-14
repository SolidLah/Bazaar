import { Container, Spinner } from "@chakra-ui/react";

const LoadingLayout = () => {
  return (
    <Container mt={20} centerContent>
      <Spinner size="xl" color="gray" />
    </Container>
  );
};
export default LoadingLayout;

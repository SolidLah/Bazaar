import { Center, Spinner } from "@chakra-ui/react";

const LoadingLayout = () => {
  return (
    <Center p={10}>
      <Spinner size="xl" color="gray" />
    </Center>
  );
};
export default LoadingLayout;

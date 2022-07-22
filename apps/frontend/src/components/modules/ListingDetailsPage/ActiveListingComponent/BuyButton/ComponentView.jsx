import { Button } from "@chakra-ui/react";

const ComponentView = ({ callback, loading, ...props }) => {
  return (
    <Button
      onClick={callback}
      isLoading={loading}
      colorScheme="purple"
      {...props}
    >
      Buy
    </Button>
  );
};

export default ComponentView;

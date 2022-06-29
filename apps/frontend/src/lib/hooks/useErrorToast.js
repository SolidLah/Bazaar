import { useToast } from "@chakra-ui/react";

const useErrorToast = (title) => {
  const toast = useToast({
    title: title,
    status: "error",
    isClosable: true,
    position: "bottom-right",
  });

  return toast;
};

export default useErrorToast;

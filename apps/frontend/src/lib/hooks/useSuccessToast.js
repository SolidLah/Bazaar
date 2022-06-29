import { useToast } from "@chakra-ui/react";

const useSuccessToast = (title) => {
  const toast = useToast({
    title: title,
    status: "success",
    isClosable: true,
    position: "bottom-right",
  });

  return toast;
};

export default useSuccessToast;

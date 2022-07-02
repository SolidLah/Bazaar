import { useToast } from "@chakra-ui/react";

export default function useErrorToast(title) {
  const toast = useToast({
    title: title,
    status: "error",
    isClosable: true,
    position: "bottom-right",
  });

  return toast;
}

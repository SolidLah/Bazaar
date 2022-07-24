import { useToast } from "@chakra-ui/react";

export default function useSuccessToast(title) {
  const toast = useToast({
    title: title,
    description: "Success",
    status: "success",
    isClosable: true,
    position: "bottom-right",
  });

  return toast;
}

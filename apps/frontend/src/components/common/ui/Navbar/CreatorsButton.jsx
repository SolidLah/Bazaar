import { Button } from "@chakra-ui/react";
import Link from "next/link";

const CreatorsButton = () => {
  return (
    <Link href="/creators" passHref>
      <Button as="a" colorScheme="blackAlpha" variant="ghost" color="white">
        Creators
      </Button>
    </Link>
  );
};

export default CreatorsButton;

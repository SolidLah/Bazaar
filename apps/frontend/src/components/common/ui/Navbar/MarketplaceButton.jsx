import { Button } from "@chakra-ui/react";
import Link from "next/link";

const MarketplaceButton = () => {
  return (
    <Link href="/marketplace" passHref>
      <Button as="a" colorScheme="blackAlpha" variant="ghost" color="white">
        Marketplace
      </Button>
    </Link>
  );
};

export default MarketplaceButton;

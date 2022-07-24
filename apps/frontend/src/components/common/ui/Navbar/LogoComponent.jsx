import { Heading, HStack } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const LogoComponent = () => {
  return (
    <Link href="/" passHref>
      <HStack spacing={0} cursor="pointer">
        <Heading size="xl" color="black">
          Bazaar
        </Heading>
        <Image
          src="/images/bazaar_icon_alpha.png"
          alt="Bazaar Icon"
          width="30px"
          height="30px"
        />
      </HStack>
    </Link>
  );
};

export default LogoComponent;

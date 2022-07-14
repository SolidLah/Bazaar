import { Flex, Heading } from "@chakra-ui/react";
import Card from "src/components/common/ui/Card/Card";

const MintedComponent = ({ minted }) => {
  return (
    <Flex w="100%" direction="column" gap={6}>
      <Heading>Minted NFTs</Heading>
      <Flex justify="flex-start" wrap="wrap" gap={6}>
        {minted.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </Flex>
    </Flex>
  );
};

export default MintedComponent;

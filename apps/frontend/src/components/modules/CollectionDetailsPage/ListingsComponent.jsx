import { Flex, Heading } from "@chakra-ui/react";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";

const ListingsComponent = ({ isOwner, items }) => {
  const active = items.filter((item) => item.active);
  const inactive = items.filter((item) => !item.active);

  return (
    <Flex w="100%" direction="column" gap={6}>
      <Heading>Active</Heading>
      <Flex justify="flex-start" wrap="wrap" gap={6}>
        {active.map((item) => (
          <LinkedCard key={item.itemId} item={item} watchlistEnabled={true} />
        ))}
      </Flex>
      {isOwner && (
        <>
          <Heading>Inactive</Heading>
          <Flex justify="flex-start" wrap="wrap" gap={6}>
            {inactive.map((item) => (
              <LinkedCard key={item.itemId} item={item} inactive />
            ))}
          </Flex>
        </>
      )}
    </Flex>
  );
};

export default ListingsComponent;

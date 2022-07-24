import { Flex } from "@chakra-ui/react";
import { isEmpty } from "lodash";
import ErrorLayout from "src/components/common/layouts/ErrorLayout";
import LinkedCard from "src/components/common/ui/LinkedCard/LinkedCard";

const ListingsComponent = ({ items }) => {
  const active = items.filter((item) => item.active);

  if (isEmpty(active)) return <ErrorLayout message="No active listings" />;

  return (
    <Flex w="100%" direction="column" gap={6}>
      <Flex justify="flex-start" wrap="wrap" gap={6}>
        {active.map((item) => (
          <LinkedCard key={item.itemId} item={item} watchlistEnabled={true} />
        ))}
      </Flex>
    </Flex>
  );
};

export default ListingsComponent;

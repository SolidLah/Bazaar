import { StarIcon } from "@chakra-ui/icons";
import { IconButton } from "@chakra-ui/react";

const ComponentView = ({
  toastedCallback,
  loading,
  itemInWatchlist,
  isOwner,
  ...props
}) => {
  return (
    <IconButton
      icon={<StarIcon />}
      onClick={toastedCallback}
      isActive={itemInWatchlist}
      isDisabled={isOwner}
      isLoading={loading}
      {...props}
    />
  );
};

export default ComponentView;

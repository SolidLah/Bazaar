import { Square, Flex, Box, Heading, Badge } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const blurImage =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAMAAAC67D+PAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAY1BMVEWsY6OxY6G3Y568YpzCYprHYZjNYZXSYZPYYJHdYY+nY6WyY6G3Yp69YpzIYZfTYZOhY6emY6XIYpecZKqhZKiWZKybZKqhY6iRZa6LZbGQZa6FZbOKZbGAZrV7ZreLZbD///+WRnhMAAAAAWJLR0Qgs2s9gAAAAAd0SU1FB+YGHA82GuZkYIoAAABPSURBVAjXLcvbEkAgAEXRo7tuIhGJ//9Lo7yt2TMbGAhlXEg1QsNYx7yYFMLc+iIk4trtBdK2d3Pk347hOLstRbm6DUFt/l7ctTw5xaDxAtQ8BOGvecsHAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDIyLTA2LTI4VDE1OjU0OjI2KzAwOjAwwVbH8wAAACV0RVh0ZGF0ZTptb2RpZnkAMjAyMi0wNi0yOFQxNTo1NDoyNiswMDowMLALf08AAAAASUVORK5CYII=";

const Card = ({ item }) => {
  return (
    <Link href={`/marketplace/details/${item.itemId}`} passHref>
      <Square
        as={motion.div}
        size={60}
        bg="gray.100"
        m={3}
        borderRadius={10}
        _hover={{ shadow: "outline" }}
        cursor="pointer"
        whileHover={{ y: -3, scale: 1.02 }}
      >
        <Flex
          w="100%"
          h="100%"
          direction="column"
          align="center"
          justify="flex-end"
        >
          <Box w="100%" h="100%" pos="relative">
            <Image
              src={item.nftData.image}
              alt="NFT here"
              priority="true"
              layout="fill"
              objectFit="cover"
              style={{ borderTopRightRadius: 10, borderTopLeftRadius: 10 }}
              placeholder="blur"
              blurDataURL={blurImage}
            />
          </Box>
          <Flex
            bg="gray.200"
            w="100%"
            p={3}
            borderBottomRadius={10}
            direction="row"
            justify="space-between"
          >
            <Heading size="sm">{item.nftData.name}</Heading>
            <Badge colorScheme="green" variant="subtle" fontSize={12}>
              {item.marketPrice} MATIC
            </Badge>
          </Flex>
        </Flex>
      </Square>
    </Link>
  );
};

export default Card;

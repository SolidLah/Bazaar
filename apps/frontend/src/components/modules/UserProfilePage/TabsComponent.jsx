import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { userContext } from "src/contexts/userContext";
import CollectionsComponent from "./CollectionsComponent";
import FollowingComponent from "./FollowingComponent";
import ListingsComponent from "./ListingsComponent";
import OwnedComponent from "./OwnedComponent";
import WatchListComponent from "./WatchlistComponent";

const TabsComponent = ({ data }) => {
  // router uid
  const router = useRouter();
  const { uid } = router.query;

  // current logged in uid
  const { uid: myUid } = useContext(userContext);
  const isMyProfile = uid && myUid ? uid === myUid : false;

  return (
    <Tabs variant="soft-rounded" colorScheme="purple">
      <TabList gap={3}>
        <Tab>Active listings</Tab>
        <Tab>Collections</Tab>
        {isMyProfile && <Tab>Owned NFTs</Tab>}
        {isMyProfile && <Tab>Watchlist</Tab>}
        {isMyProfile && <Tab>Following</Tab>}
      </TabList>
      <TabPanels>
        <TabPanel>
          <ListingsComponent data={data} />
        </TabPanel>
        <TabPanel>
          <CollectionsComponent data={data} />
        </TabPanel>
        {isMyProfile && (
          <TabPanel>
            <OwnedComponent data={data} />
          </TabPanel>
        )}
        {isMyProfile && (
          <TabPanel>
            <WatchListComponent data={data} />
          </TabPanel>
        )}
        {isMyProfile && (
          <TabPanel>
            <FollowingComponent data={data} />
          </TabPanel>
        )}
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;

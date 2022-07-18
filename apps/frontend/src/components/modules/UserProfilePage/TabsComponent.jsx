import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useContext } from "react";
import { userContext } from "src/contexts/userContext";
import CollectionsComponent from "./CollectionsComponent";
import ListingsComponent from "./ListingsComponent";
import OwnedComponent from "./OwnedComponent";
import WatchListComponent from "./WatchlistComponent";

const TabsComponent = ({ userData }) => {
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
        <Tab>Owned NFTs</Tab>
        <Tab>Collections</Tab>
        {isMyProfile && <Tab>Watchlist</Tab>}
        {isMyProfile && <Tab>Following</Tab>}
      </TabList>
      <TabPanels>
        {isMyProfile && (
          <TabPanel>
            <WatchListComponent userData={userData} />
          </TabPanel>
        )}
        <TabPanel>
          <ListingsComponent userData={userData} />
        </TabPanel>
        <TabPanel>
          <OwnedComponent userData={userData} />
        </TabPanel>
        <TabPanel>
          <CollectionsComponent userData={userData} />
        </TabPanel>
        {isMyProfile && <TabPanel>Following list</TabPanel>}
      </TabPanels>
    </Tabs>
  );
};

export default TabsComponent;

import Navbar from "src/components/common/ui/Navbar/Navbar";
import { UserProvider } from "src/contexts/userContext";
import { Web3Provider } from "src/contexts/web3Context";

const BaseLayout = ({ children }) => {
  return (
    <UserProvider>
      <Web3Provider>
        <Navbar />
        <main>{children}</main>
      </Web3Provider>
    </UserProvider>
  );
};

export default BaseLayout;

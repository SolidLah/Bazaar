import Navbar from "src/components/common/ui/Navbar/Navbar";
import { UserProvider } from "src/contexts/userContext";

const BaseLayout = ({ children }) => {
  return (
    <UserProvider>
      <Navbar />
      <main>{children}</main>
    </UserProvider>
  );
};

export default BaseLayout;

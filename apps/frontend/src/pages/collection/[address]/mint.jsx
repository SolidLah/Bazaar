import { useRouter } from "next/router";
import MintForm from "src/components/modules/MintForm/MintForm";

const Mint = () => {
  const router = useRouter();
  const { address } = router.query;

  return <MintForm address={address} />;
};

export default Mint;

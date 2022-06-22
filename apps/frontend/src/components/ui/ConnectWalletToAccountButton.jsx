import { Button } from "@chakra-ui/react"
import useEthersStore from "src/stores/ethersStore"
import { db } from "src/functions/firebase"
import { doc, collection, where, update } from "firebase/firestore"

const ConnectWalletToAccountButton = (props) => {
  const address = useEthersStore((state) => state.address)
  const initialiseEthers = useEthersStore((state) => state.initialiseEthers)
  const connectAddresstoAccount = () => {
    const uID = props.uID
    db.collection("users").doc("user").where("uid", "==", uID).update({walletAddress: address})
  }

  return (
    <Button onClick={connectAddresstoAccount} {...props}>
      {address
        ? `${address.slice(0, 3)}...${address.slice(38)}`
        : "Connect your wallet to your account!"}
    </Button>
  )
}

export default ConnectWalletToAccountButton

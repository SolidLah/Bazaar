export default function getWeb3(ethersInitialised) {
  let error = "";

  if (typeof window.ethereum === "undefined") {
    error = "Metamask is not installed!";
  }

  if (!ethersInitialised) {
    error = "Connect a Metamask wallet!";
  }

  return error;
}

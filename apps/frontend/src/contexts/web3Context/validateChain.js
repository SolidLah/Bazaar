export default async function validateChain(provider, requestSwap = true) {
  const currNetwork = await provider.getNetwork();
  const isValidated = currNetwork.chainId === 80001;

  if (!isValidated && requestSwap) {
    await provider.send("wallet_addEthereumChain", [
      {
        chainId: "0x13881",
        rpcUrls: ["https://rpc-mumbai.maticvigil.com"],
        chainName: "Polygon Testnet Mumbai",
        nativeCurrency: {
          name: "tMATIC",
          symbol: "tMATIC",
          decimals: 18,
        },
        blockExplorerUrls: ["https://polygonscan.com/"],
      },
    ]);
  }

  return isValidated;
}

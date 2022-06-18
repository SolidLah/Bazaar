import { ethers } from "ethers"
import { NFTContractData, MarketplaceContractData } from "src/contractData"

const toEth = (num) => ethers.utils.formatEther(num)

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const provider = new ethers.providers.JsonRpcProvider(
        process.env.MATIC_VIGIL_URL
      )

      const mktContractReader = new ethers.Contract(
        MarketplaceContractData.address,
        MarketplaceContractData.abi,
        provider
      )

      const nftContractReader = new ethers.Contract(
        NFTContractData.address,
        NFTContractData.abi,
        provider
      )

      let listOfNFTs = await mktContractReader.fetchMarketItems()

      listOfNFTs = await Promise.all(
        listOfNFTs.map(async (nft) => {
          const tokenURI = await nftContractReader.tokenURI(nft[2])

          /* @interface metadata = {
            image,
            name,
            description,
          } */
          const metadata = await (await fetch(tokenURI)).json()

          return {
            ...metadata,
            itemId: nft[0].toNumber(),
            price: Number(toEth(nft[3])),
            seller: nft[4],
          }
        })
      )
      res
        .status(200)
        .json({ route: "api/listings/", success: true, msg: listOfNFTs })
    } catch (error) {
      res
        .status(500)
        .json({ route: "api/listings/", success: false, msg: error })
    }
  }
}

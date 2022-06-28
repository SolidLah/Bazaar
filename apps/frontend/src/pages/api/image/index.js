import { IncomingForm } from "formidable";
import pinataSDK from "@pinata/sdk";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true });
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err);
      resolve({ fields, files });
    });
  });

const pinata = pinataSDK(
  process.env.PINATA_API_KEY,
  process.env.PINATA_API_SECRET
);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const isAuth = (await pinata.testAuthentication()).authenticated;

      if (!isAuth) {
        res
          .status(401)
          .json({ route: "api/image/", success: false, msg: "Unauthorised" });
        return;
      }

      const formidableRes = await asyncParse(req);

      // getting data from request
      const image = fs.createReadStream(formidableRes.files.image.filepath);
      const name = formidableRes.fields.name;
      const description = formidableRes.fields.description;

      // upload image
      const imageCID = (await pinata.pinFileToIPFS(image)).IpfsHash;
      const imageURI = "https://gateway.pinata.cloud/ipfs/" + imageCID;

      const nftJSON = {
        image: imageURI,
        name,
        description,
      };

      // upload NFT
      const nftCID = (await pinata.pinJSONToIPFS(nftJSON)).IpfsHash;
      const nftURI = "https://gateway.pinata.cloud/ipfs/" + nftCID;

      res.status(200).json({ route: "api/image/", success: true, msg: nftURI });
    } catch (error) {
      res.status(500).json({ route: "api/image/", success: false, msg: error });
    }
  }
}

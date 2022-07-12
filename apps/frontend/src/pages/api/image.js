import { IncomingForm } from "formidable";
import Moralis from "moralis/node";
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

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await Moralis.start({
        serverUrl: process.env.MORALIS_SERVER_URL,
        appId: process.env.MORALIS_APP_ID,
        masterKey: process.env.MORALIS_MASTER_KEY,
      });

      const formidableRes = await asyncParse(req);

      // getting data from request
      const image = formidableRes.files.image;
      let stream;
      await new Promise((res, rej) => {
        fs.readFile(image.filepath, (err, data) => {
          if (err) {
            rej();
          }

          stream = data.toString("base64");
          res();
        });
      });

      const name = formidableRes.fields.name;
      const description = formidableRes.fields.description;

      // upload image
      const imageURL = (
        await Moralis.Web3API.storage.uploadFolder({
          abi: [
            {
              path: "image/" + image.originalFilename,
              content: stream,
            },
          ],
        })
      )[0].path;

      console.log("image URL:", imageURL);

      const nftJSON = {
        image: imageURL,
        name,
        description,
      };

      // upload NFT
      const nftURL = (
        await Moralis.Web3API.storage.uploadFolder({
          abi: [
            {
              path: `metadata/${name}.json`,
              content: nftJSON,
            },
          ],
        })
      )[0].path;

      console.log("nft URL:", nftURL);

      res.status(200).json({ route: "api/image/", success: true, msg: nftURL });
    } catch (error) {
      console.log(error);
      res.status(500).json({ route: "api/image/", success: false, msg: error });
    }
  }
}

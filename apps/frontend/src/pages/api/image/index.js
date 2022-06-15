import { IncomingForm } from "formidable"
import pinataSDK from "@pinata/sdk"
import fs from "fs"

export const config = {
  api: {
    bodyParser: false,
  },
}

const asyncParse = (req) =>
  new Promise((resolve, reject) => {
    const form = new IncomingForm({ multiples: true })
    form.parse(req, (err, fields, files) => {
      if (err) return reject(err)
      resolve({ fields, files })
    })
  })

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const pinata = pinataSDK(
        process.env.PINATA_API_KEY,
        process.env.PINATA_API_SECRET
      )

      const isAuth = (await pinata.testAuthentication()).authenticated

      if (!isAuth) {
        throw new Error("Pinata is not authenticated")
      }

      const formidableRes = await asyncParse(req)

      const type = formidableRes.fields.type

      let pinataRes

      if (type === "IMAGE") {
        const image = fs.createReadStream(formidableRes.files.image.filepath)
        pinataRes = await pinata.pinFileToIPFS(image)
      }

      if (type === "NFT") {
        const nftJSON = JSON.parse(formidableRes.fields.nftJSON)
        pinataRes = await pinata.pinJSONToIPFS(nftJSON)
      }

      res
        .status(200)
        .json({ route: "api/image/", success: true, msg: pinataRes })
    } catch (error) {
      res.status(500).json({ route: "api/image/", success: false, msg: error })
    }
  }
}

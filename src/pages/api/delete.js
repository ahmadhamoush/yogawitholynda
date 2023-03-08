import { initMongoose } from "lib/mongoose"
import Product from "models/Product"
export default async function handler(req, res) {
    await initMongoose()
    const deleteProduct = await Product.findOne({ _id: req.body.deleteID })
    res.json(await Product.deleteOne({ _id: req.body.deleteID }))
}
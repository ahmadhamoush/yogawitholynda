import Product from "models/Product"
import { initMongoose } from "lib/mongoose";

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }


    await initMongoose()
    const { ids } = req.query
    const idsArr = ids.split(',')

    if (ids) {

        res.json(await Product.find({ '_id': { $in: idsArr } }).exec())
    } else {
        res.json({ message: 'No products found' })
    }


}
import Product from "models/Product"
import { initMongoose } from "lib/mongoose";
import mongoose from "mongoose";
export default async function handler(req, res) {

    await initMongoose()
    const { ids } = req.query
    const idsArr = ids.split('-')

    if (ids) {

        res.json(await Product.find({ '_id': { $in: idsArr } }).exec())


    } else if (!ids) {
        res.json({ message: 'No products found' })
    } else {
        res.status(405).send({ message: 'Can only be accessed in frontend' })
    }



}
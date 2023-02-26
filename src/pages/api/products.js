import { initMongoose } from "lib/mongoose";
import Product from "models/Product";


export async function findAllProducts() {
    return Product.find().exec()
}
export async function listCollection(collection) {
    return Product.find({ category: collection }).exec()
}
export async function findProduct(productName) {
    return Product.findOne({ name: productName }).exec()
}

export async function editProduct(productId, newProduct) {
    return Product.updateOne({ _id: productId }, newProduct).exec()
}

export default async function handler(req, res) {
    await initMongoose()

    if (req.method === 'POST') {
        await editProduct(req.body._id, req.body)
        res.json({ updated: true, productUpdated: req.body })
    } else {
        res.json(await findAllProducts())
    }

}
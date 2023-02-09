import { initMongoose } from "lib/mongoose";
import Product from "models/Product";


export async function findAllProducts() {
    return Product.find().exec()
}
export async function listCollection(collection) {
    return Product.find({ category: collection }).exec()
}
export async function findProduct(productId) {
    return Product.findOne({ _id: productId }).exec()
}
export default async function handler(req, res) {

    await initMongoose()
    res.json(await findAllProducts())
}
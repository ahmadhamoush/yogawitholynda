import { initMongoose } from "lib/mongoose"
import Product from "models/Product"
import path from "path";
const fs = require("fs");
export default async function handler(req, res) {
    await initMongoose()
    const deleteProduct = await Product.findOne({ _id: req.body.deleteID })
    fs.unlink(path.join(process.cwd(), `/public${await deleteProduct.image}`), async(err) => {
        if (err) throw err;
        console.log(path.join(process.cwd(), `/public${await deleteProduct.image}` + ' was deleted'));
    })
    res.json(await Product.deleteOne({ _id: req.body.deleteID }))
}
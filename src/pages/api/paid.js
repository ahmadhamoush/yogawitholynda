import { initMongoose } from "lib/mongoose"
import Order from "models/Order"
export default async function handler(req, res) {
    await initMongoose()
    res.json(await Order.updateOne({ orderID: req.body.orderID }, { paid: !req.body.currentValue }))
}
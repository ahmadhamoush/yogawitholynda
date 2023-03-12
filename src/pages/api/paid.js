import { initMongoose } from "lib/mongoose"
import Order from "models/Order"
import { getToken } from "next-auth/jwt"
export default async function handler(req, res) {
    const token = await getToken({ req })

    console.log(token)
    await initMongoose()
    res.json(await Order.updateOne({ orderID: req.body.orderID }, { paid: !req.body.currentValue }))
}
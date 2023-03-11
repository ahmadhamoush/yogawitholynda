import { initMongoose } from "lib/mongoose";
import Order from "models/Order";
import { getSession } from "next-auth/react";

export async function findOrder(id) {
    return Order.findOne({ orderID: id }).exec()
}
export default async function handler(req, res) {

    const session = await getSession(({ req }))
    if (!session) {
        return res.json({ message: 'signin required' })
    }
    await initMongoose()
    const order = await findOrder(req.query.id)

    res.json(order)

}
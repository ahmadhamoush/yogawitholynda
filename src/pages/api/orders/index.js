import { initMongoose } from "lib/mongoose";
import Order from "models/Order";
import { getSession } from "next-auth/react";

export async function findAllOrders() {
    return Order.find().exec()
}
export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session?.user.isAdmin) {
        return res.status(401).send({ message: 'Not Authorized' })
    }
    await initMongoose()
    res.json(await findAllOrders())

}
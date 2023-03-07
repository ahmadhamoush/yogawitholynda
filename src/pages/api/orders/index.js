import { initMongoose } from "lib/mongoose";
import Order from "models/Order";


export async function findAllOrders() {
    return Order.find().exec()
}
export default async function handler(req, res) {
    await initMongoose()
    res.json(await findAllOrders())
}
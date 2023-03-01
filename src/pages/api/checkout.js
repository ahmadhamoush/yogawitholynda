import { initMongoose } from "lib/mongoose";
import Order from "models/Order";

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    await initMongoose()
    res.status(200).json(await Order.create({
        orderID: new Date().getFullYear().toString() + Math.floor(100000 + Math.random() * 900000).toString(),
        products: req.body.products,
        user: req.body.user,
        number: req.body.number,
        address: req.body.address,
        city: req.body.city,
        paid: false,
        total: req.body.total,
        subtotal: req.body.subTotal
    }))
}
import { initMongoose } from "lib/mongoose";
import Order from "models/Order";

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    await initMongoose()
    res.status(200).json(await Order.create({
        products: req.body.products,
        name: req.body.name,
        email: req.body.email,
        number: req.body.number,
        address: req.body.address,
        city: req.body.city,
        paid: false,
        total: req.body.total,
        subtotal: req.body.subTotal
    }))
}
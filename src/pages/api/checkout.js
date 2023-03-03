import { initMongoose } from "lib/mongoose";
import Order from "models/Order";
import User from "models/User";

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    await initMongoose()

    const foundUser = await User.updateOne({ _id: req.body.user._id }, {
        number: req.body.number,
        address: req.body.address,
    }, { multi: true })

    res.status(200).json(await Order.create({
        orderID: new Date().getFullYear().toString() + Math.floor(100000 + Math.random() * 900000).toString(),
        products: req.body.products,
        user: await User.findOne({ _id: req.body.user._id }),
        paid: false,
        total: req.body.total,
        subtotal: req.body.subTotal
    }))
}
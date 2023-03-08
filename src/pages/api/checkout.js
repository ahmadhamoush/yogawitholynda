import { initMongoose } from "lib/mongoose";
import Order from "models/Order";
import Product from "models/Product";
import User from "models/User";

export default async function handler(req, res) {

    if (req.method !== 'POST') {
        res.status(405).send({ message: 'Only POST requests allowed' })
        return
    }

    await initMongoose()

    await User.updateOne({ _id: req.body.userID }, {
        number: req.body.number,
        address: req.body.address,
    }, { multi: true })

    req.body.products.map(async product => {
        await Product.updateOne({ _id: product.id }, {
            stock: product.stock - product.quantity,
        })
    })
    const order = await Order.create({
        orderID: req.body.orderID,
        products: req.body.products,
        user: await User.findOne({ _id: req.body.userID }),
        paid: false,
        delivered: false,
        total: req.body.total,
        subtotal: req.body.subTotal
    })
    res.status(201).json(order)
}
import { initMongoose } from "lib/mongoose";
import Order from "models/Order";
import User from "models/User";
import { getSession } from "next-auth/react";


export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session) {
        return res.status(401).send({ message: 'signin required' })
    }
    const { user } = session
    await initMongoose()
    const currentUser = await User.findOne({ _id: user.id })
    res.json(await Order.find({ 'user.email': currentUser.email }))
}
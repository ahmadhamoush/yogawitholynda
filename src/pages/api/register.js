import { initMongoose } from "lib/mongoose";
import User from "models/User";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        await initMongoose()
        const { fName, lName, email, password } = req.body;
        const foundUser = await User.find({ email: email }).exec()
        if (foundUser.length) {
            res.status(406).send({ message: 'Email Already Registered' })
        } else {
            const user = await User.create({
                fName,
                lName,
                email,
                password,
            })
            res.status(201).json({ user })
        }

    } else {
        res.status(405).send({ message: 'Only POST requests allowed' })
    }

}
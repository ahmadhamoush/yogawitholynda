import { initMongoose } from "lib/mongoose";
import User from "models/User";
import { getSession } from "next-auth/react";

export async function findAllUsers() {
    return User.find().exec()
}

export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session?.user.isAdmin) {
        return res.status(401).send({ message: 'Not Authorized' })
    }
    await initMongoose()
    res.json(await findAllUsers())
}
import { initMongoose } from "lib/mongoose";
import User from "models/User";

export async function findAllUsers() {
    return User.find().exec()
}
export async function findUser(email) {
    return User.findOne({ email }).exec()
}
export default async function handler(req, res) {
    await initMongoose()
    if (req.query.email) {
        res.json(await findUser(req.query.email))
    } else {
        res.json(await findAllUsers())
    }
}
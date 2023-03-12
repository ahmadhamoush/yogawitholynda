import { initMongoose } from "lib/mongoose";
import User from "models/User";

export async function findAllUsers() {
    return User.find().exec()
}

export default async function handler(req, res) {
    await initMongoose()
    res.json(await findAllUsers())
}
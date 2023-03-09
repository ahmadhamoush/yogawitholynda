import { initMongoose } from "lib/mongoose";
import Collection from "models/Collection";

export async function findAllCollections() {
    return Collection.find().exec()
}
export default async function handler(req, res) {
    await initMongoose()
    return res.json(await findAllCollections())
}
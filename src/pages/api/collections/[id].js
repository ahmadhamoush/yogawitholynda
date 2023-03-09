import { initMongoose } from "lib/mongoose";
import Collection from "models/Collection";

export async function findCollection(name) {
    return Collection.findOne({ name: name.split('-').join(' ') }).exec()

}
export default async function handler(req, res) {
    await initMongoose()
    return res.json(await findCollection(req.query.id))
}
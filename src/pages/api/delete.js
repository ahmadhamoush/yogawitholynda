import { initMongoose } from "lib/mongoose"
import Product from "models/Product"
import { getSession } from "next-auth/react"
export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session?.user.isAdmin) {
        return res.status(401).send({ message: 'Not Authorized' })
    }
    await initMongoose()
    const deleteProduct = await Product.findOne({ _id: req.body.deleteID })
    res.json(await Product.deleteOne({ _id: req.body.deleteID }))
}
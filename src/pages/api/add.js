import formidable from "formidable"
import path from "path"
import Product from "models/Product"
import { initMongoose } from "lib/mongoose"
export const config = {
    api: {
        bodyParser: false
    }
}

const readFile = (req, saveLocally) => {
    const options = {}
    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), '/public/products')
        options.filename = (name, ext, path, form) => {
            return path.originalFilename
        }
    }
    const form = formidable(options)
    const types = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp']
    return new Promise((resolve, reject) => {
        form.parse(req, async(err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files })
            await initMongoose()
            const newProduct = await Product.create({
                name: fields.name,
                price: Number(fields.price),
                category: fields.category,
                featured: fields.featured === 'true' ? true : false,
                color: fields.color,
                stock: Number(fields.stock),
                description: [fields.description.split(',')],
                image: `/products/${files.img.newFilename}`
            })
        })
    })
}
export default async function handler(req, res) {
    await readFile(req, true)
    res.json({ done: 'ok' })
}
import formidable from "formidable"
import streamifier from "streamifier";
import { v2 as cloudinary } from 'cloudinary'
import Product from "models/Product"
import { initMongoose } from "lib/mongoose"
import path from "path";
import { getSession } from "next-auth/react";
const fs = require("fs");
export const config = {
    api: {
        bodyParser: false
    }
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
});
const readFile = (req) => {
    return new Promise((resolve, reject) => {
        const form = formidable()
        form.parse(req, async(err, fields, files) => {
            if (err) reject(err)
            resolve({ fields, files })
            var oldPath = files.img.filepath
            var rawData = fs.readFileSync(oldPath)
            const stream = cloudinary.uploader.upload_stream({
                    folder: "yogawitholynda",
                    public_id: path.parse(files.img.originalFilename).name
                },
                (error, result) => {
                    if (error)
                        return console.error(error);
                }
            );
            streamifier.createReadStream(rawData).pipe(stream);
            await initMongoose()
            const newProduct = await Product.create({
                name: fields.name,
                price: Number(fields.price),
                category: fields.category,
                featured: fields.featured === 'true' ? true : false,
                color: fields.color,
                stock: Number(fields.stock),
                description: fields.description.split(',').map(d => d),
                count: 0,
                image: `https://res.cloudinary.com/hamoush/image/upload/v1678284450/yogawitholynda/${files.img.originalFilename}`
            })
        })
    })
}
export default async function handler(req, res) {
    const session = await getSession({ req })
    if (!session?.user.isAdmin) {
        return res.status(401).send({ message: 'Not Authorized' })
    } 
    await readFile(req)
    res.json({ done: 'ok' })
}
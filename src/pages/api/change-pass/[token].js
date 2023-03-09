import jwt from "jsonwebtoken";
export default async function handler(req, res) {

    const decoded = jwt.verify(req.query.token, 'yoga@123');
    console.log(decoded)
    res.json(decoded)
}
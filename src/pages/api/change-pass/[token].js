import jwt from "jsonwebtoken";
export default async function handler(req, res) {

    jwt.verify(req.query.token, 'yoga@123', (err, decoded) => {
        if (err) {
            res.json({ message: 'token expired' })
        } else {
            res.json(decoded)
        }
    });
}
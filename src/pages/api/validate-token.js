import jwt from "jsonwebtoken";
export default async function handler(req, res) {

    jwt.verify(req.body.token, process.env.JWT_SECRET, async(err, decoded) => {
        if (err) {
            res.json({ message: 'token expired' })
        } else {
            if (Number(req.body.key) === decoded.key) {
                res.json({ email: decoded.data, message: 'valid' })

            } else {
                res.json({ message: 'invalid 6 digits' })
            }
        }
    });
}
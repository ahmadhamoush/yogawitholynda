import jwt from "jsonwebtoken";
import User from "models/User";
import bcrypt from 'bcryptjs'
export default async function handler(req, res) {

    jwt.verify(req.body.token, process.env.JWT_SECRET, async(err, decoded) => {
        if (err) {
            res.json({ message: 'token expired' })
        } else {
            await User.updateOne({ email: decoded.data }, {
                password: await bcrypt.hash(req.body.password, 10)
            })
        }
    });
    res.json({ email: jwt.verify(req.body.token, process.env.JWT_SECRET).data, message: 'Password Reset Success' })
}
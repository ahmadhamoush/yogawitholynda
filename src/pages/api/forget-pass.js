import User from "models/User";
import jwt from "jsonwebtoken";
import { sendEmail } from "lib/email";
import { render } from "@react-email/render";
import ForgetPassEmail from "@/components/ForgetPassEmail";

export default async function handler(req, res) {

    const foundUser = await User.findOne({ email: req.body.email })
    if (!foundUser) {
        res.json({ message: "email not found" })
    } else {

        const key = Math.floor(100000 + Math.random() * 900000)
        const token = jwt.sign({
            data: req.body.email,
            key,
        }, 'yoga@123', { expiresIn: 60 * 15 })
        const user = {
            name: foundUser.fName,
            key,
            reset: `http://yogawitholynda.com/api/change-pass/${token}`
        }
        await sendEmail({
            to: req.body.email,
            subject: "Password Reset",
            html: render(ForgetPassEmail(user)),
        });
    }




    res.status(200).json({ message: 'email sent' })
}
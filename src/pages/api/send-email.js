import { render } from "@react-email/render";
import OrderEamil from "@/components/OrderEmail";
import { sendEmail } from "lib/email";

export default async function handler(req, res) {
    await sendEmail({
        to: "hamoush20@gmail.com",
        subject: "Welcome to NextAPI",
        html: render(OrderEamil()),
    });

    return res.status(200).json({ message: "Email sent successfully" });
}
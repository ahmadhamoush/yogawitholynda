import nodemailer from "nodemailer"

const EmailPayload = {
    to: String,
    subject: String,
    html: String,
}

// Replace with your SMTP credentials
const smtpOptions = {
    service: "gmail",
    pool: true,
    maxConnections: 3,
    auth: {
        user: "yogawitholynda@gmail.com",
        pass: "xuafexkbrabncjmp",
    },
}

export const sendEmail = async(data) => {
    const transporter = nodemailer.createTransport({
        ...smtpOptions,
    })

    return await transporter.sendMail({
        from: 'yogawitholynda@gmail.com',
        ...data,
    })

}
import nodemailer from "nodemailer"

const EmailPayload = {
    to: String,
    subject: String,
    html: String,
}

// Replace with your SMTP credentials
const smtpOptions = {
    service: "hotmail",
    pool: true,
    maxConnections: 3,
    auth: {
        user: "yogawitholynda@hotmail.com",
        pass: "Yoga@123",
    },
}

export const sendEmail = async(data) => {
    const transporter = nodemailer.createTransport({
        ...smtpOptions,
    })

    return await transporter.sendMail({
        from: 'yogawitholynda@hotmail.com',
        ...data,
    })

}
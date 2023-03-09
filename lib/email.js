import nodemailer from "nodemailer"

const EmailPayload = {
    to: String,
    subject: String,
    html: String,
}

// Replace with your SMTP credentials
const smtpOptions = {
    service: process.env.EMAIL_SERVICE,
    pool: true,
    maxConnections: 3,
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
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
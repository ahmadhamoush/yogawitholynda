import { initMongoose } from "lib/mongoose"
import User from "models/User"
import bcrypt from 'bcryptjs'
import { getSession } from "next-auth/react"
import Order from "models/Order"

export default async function handler(req, res) {

    const session = await getSession({ req })
    if (!session) {
        return res.status(401).send({ message: 'Not Authorized' })
    }

    await initMongoose()
    let err = []
    let updated = []

    if (req.body.fName) {
        await User.updateOne({ _id: req.body.id }, { fName: req.body.fName })
        updated.push('First Name')
    }
    if (req.body.lName) {
        await User.updateOne({ _id: req.body.id }, { lName: req.body.lName })
        updated.push('Last Name')
    }
    if (req.body.email) {
        if (validateEmail(req.body.email)) {
            const foundUser = await User.findOne({ email: req.body.email })
            if (!foundUser) {
                await User.updateOne({ _id: req.body.id }, { email: req.body.email })
                await Order.updateMany({ 'user.email': session.user.email }, { 'user.email': req.body.email })
                updated.push('Email')
            } else {
                err.push('Email Taken')
            }

        } else {
            err.push('Email Not Valid')
        }

    }
    if (req.body.number) {
        await User.updateOne({ _id: req.body.id }, { number: Number(req.body.number) })
        updated.push('Number')
    }
    if (req.body.main) {
        await User.findOneAndUpdate({ _id: req.body.id }, { 'address.main': req.body.main })
        updated.push('Main Address')
    }
    if (req.body.secondary) {
        await User.findOneAndUpdate({ _id: req.body.id }, { 'address.secondary': req.body.secondary })
        updated.push('Secondary Address')
    }
    if (req.body.city) {
        await User.findOneAndUpdate({ _id: req.body.id }, { 'address.city': req.body.city })
        updated.push('City Address')
    }
    if (req.body.oldPass && req.body.newPass && req.body.confirmPass) {
        if (req.body.newPass !== req.body.confirmPass) {
            err.push('Passwords do not match')
        } else {
            const user = await User.findOne({ _id: req.body.id })
            const isPasswordMatched = await bcrypt.compare(req.body.oldPass, user.password)
            if (!isPasswordMatched) {
                err.push('Incorrect Old Password')
            } else {
                await User.updateOne({ _id: req.body.id }, { password: await bcrypt.hash(req.body.newPass, 10) })
                updated.push('Password')
            }
        }


    }
    res.json({ updated, err })
}
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
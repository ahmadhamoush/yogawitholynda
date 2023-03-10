import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import User from '../../../../models/User'
import bcrypt from 'bcryptjs'
import { initMongoose } from "lib/mongoose";

export default NextAuth({
    callbacks: {
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            session.user.id = token.id;
            session.user.isAdmin = token.isAdmin
            return session
        },
        async jwt({ token, user, account, profile, isNewUser }) {
            if (user) {
                token.id = user._id
                token.isAdmin = user.isAdmin
            }
            return token
        }

    },
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                await initMongoose()
                const { email, password } = credentials

                const user = await User.findOne({ email })
                if (!user) {
                    throw new Error('Invalid Email or Password')
                }

                const isPasswordMatched = await bcrypt.compare(password, user.password)

                if (!isPasswordMatched) {
                    throw new Error('Invalid Email or Password')
                }
                return user
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
})
/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        MONGODB_URL: 'mongodb+srv://hamoush:hmtGSXL1qPtgLijl@cluster0.evplv1k.mongodb.net/yogawitholynda?retryWrites=true&w=majority'
    },
    images: {
        domains: [
            'http://localhost:3000',
        ],
    },

}

module.exports = nextConfig
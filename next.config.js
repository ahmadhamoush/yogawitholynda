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
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    },

}

module.exports = nextConfig
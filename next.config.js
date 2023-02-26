/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGODB_URL: 'mongodb+srv://hamoush:hmtGSXL1qPtgLijl@cluster0.jy0bral.mongodb.net/yogawitholynda?retryWrites=true&w=majority',
        NEXTAUTH_SECRET: 'oLyNdA213$'
    },
    images: {
        domains: [
            'http://localhost:3000',
            'https://yogawitholynda.vercel.app/'
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    },

}

module.exports = nextConfig
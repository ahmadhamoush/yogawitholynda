/** @type {import('next').NextConfig} */
module.exports = {
    reactStrictMode: true,
    env: {
        MONGODB_URL: 'mongodb+srv://hamoush:hmtGSXL1qPtgLijl@cluster0.jy0bral.mongodb.net/yogawitholynda?retryWrites=true&w=majority',
        NEXTAUTH_SECRET: 'oLyNdA213$',
        CLOUD_NAME: 'hamoush',
        API_KEY: '488517389455474',
        API_SECRET: 'VsUVFBY3gMzop8U8wpx64CAP5bI',
        EMAIL_SERVICE: 'gmail',
        EMAIL_USERNAME: 'yogawitholynda@gmail.com',
        EMAIL_PASSWORD: 'xuafexkbrabncjmp'
    },
    images: {
        domains: [
            'http://localhost:3000',
            'https://yogawitholynda.vercel.app',
            'https://charming-brigadeiros-431611.netlify.app',
            'res.cloudinary.com'
        ],
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    },

}
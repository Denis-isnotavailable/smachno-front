/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'standalone',
    pageExtensions: ['tsx', 'ts'],
    sassOptions: {
        prependData: `@import '@/styles/index';`,
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '**',
            },
        ],
        // formats: ['image/avif', 'image/webp'],
    },
};

module.exports = nextConfig;


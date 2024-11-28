import { createRequire } from 'module';

const require = createRequire(import.meta.url);

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ["res.cloudinary.com"],
    },
    webpack(config, { isServer }) {
        if (!isServer) {
            config.resolve.fallback = {
                process: require.resolve('process/browser'),
                ...config.resolve.fallback,
            };
        }
        return config;
    },
};


export default nextConfig;

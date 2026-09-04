import { withPayload } from '@payloadcms/next/withPayload'
import withPlaiceholder from '@plaiceholder/next'

/** @type {import('next').NextConfig} */
const nextConfig = {
    turbopack: {
        root: process.cwd(),
    },
    webpack: (webpackConfig) => {
        webpackConfig.resolve.extensionAlias = {
            '.cjs': ['.cts', '.cjs'],
            '.js': ['.ts', '.tsx', '.js', '.jsx'],
            '.mjs': ['.mts', '.mjs'],
        }
        return webpackConfig
    },
    outputFileTracingIncludes: {
        '/**': ['./media/**/*', './fonts/**/*'],
    },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: '**.vercel-storage.com',
            },
            {
                protocol: 'https',
                hostname: '**.public.blob.vercel-storage.com',
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'fastly.picsum.photos',
            },
            {
                protocol: 'https',
                hostname: 'via.assets.so',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
        ],
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    async rewrites() {
        return [
            {
                source: '/api/media/file/:path*',
                destination: '/media/:path*',
            },
            {
                source: '/api/fonts/file/:path*',
                destination: '/fonts/:path*',
            },
        ]
    },
    async headers() {
        return [
            {
                source: '/asset/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/media/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
            {
                source: '/fonts/:path*',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ]
    },
}

export default withPlaiceholder(withPayload(nextConfig, { devBundleServerPackages: false }))

import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { resendAdapter } from '@payloadcms/email-resend'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media/config'
import { env } from './lib/env'
import { Articles } from './collections/Articles/config'
import { ArticleAuthors } from './collections/ArticleAuthors/config'
import { BlogPage } from './globals/BlogPage/config'
import { AboutPage } from './globals/AboutPage/config'
import { Header } from './globals/Header/config'
import { JoinOurInnerCircle } from './globals/JoinOurInnerCircle/config'
import { Comments } from './collections/Comments/config'
import { Fonts } from './collections/Fonts/config'
import { HomePage } from './globals/HomePage/config'
import { Footer } from './globals/Footer/config'
import { ShopPage } from './globals/ShopPage/config'
import { ContactPage } from './globals/ContactPage/config'
import { WatchPage } from './globals/WatchPage/config'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
        // Only enable auto-login in development
        autoLogin:
            process.env.NODE_ENV === 'development'
                ? {
                      email: env.CMS_SEED_ADMIN_EMAIL,
                      password: env.CMS_SEED_ADMIN_PASSWORD,
                  }
                : false,
    },
    email: resendAdapter({
        defaultFromAddress: 'onboarding@resend.dev',
        defaultFromName: 'Akanksha Rajpati',
        apiKey: process.env.RESEND_API_KEY || '',
    }),
    cors: [
        'http://localhost:8080',
        'http://localhost:3000',
        'https://akanksharajpati.vercel.app',
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    ].filter(Boolean),
    csrf: [
        'http://localhost:8080',
        'http://localhost:3000',
        'https://akanksharajpati.vercel.app',
        process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '',
    ].filter(Boolean),
    collections: [Users, Media, Articles, ArticleAuthors, Fonts, Comments],
    globals: [BlogPage, AboutPage, Header, JoinOurInnerCircle, HomePage, Footer, ShopPage, ContactPage, WatchPage],
    editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
            ...defaultFeatures,
            FixedToolbarFeature(),
        ],
    }),
    secret: process.env.PAYLOAD_SECRET || '',
    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },
    db: mongooseAdapter({
        url: process.env.DATABASE_URI || '',
        connectOptions: {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        },
    }),
    sharp,
    plugins: [
        vercelBlobStorage({
            enabled: true, // Optional, defaults to true
            // Specify which collections should use Vercel Blob
            collections: {
                [Media.slug]: true,
                [Fonts.slug]: true,
            },
            // Token provided by Vercel once Blob is added to the project
            token: process.env.BLOB_READ_WRITE_TOKEN,
        }),
    ],
})

import { getPayloadClient } from '@/lib/payload/client'
import { seedAdmin } from './seeders/admin.seeder'
import { seedMedia } from './seeders/media.seeder'
import { seedGlobals } from './seeders/globals.seeder'
import { seedFonts } from './seeders/fonts.seeder'
import { seedArticleAuthors, seedArticles } from './seeders/articles.seeder'
import { seedComments } from './seeders/comments.seeder'

async function main() {
    const payload = await getPayloadClient()
    try {
        console.log('🚀 Starting seed process...\n')

        // 1. Seed admin user
        await seedAdmin(payload)

        // 2. Seed media files (creates ~30 images from picsum.photos)
        const mediaMap = await seedMedia(payload)

        // 3. Seed fonts (3 Google Fonts uploaded to Payload fonts collection)
        const fontMap = await seedFonts(payload)

        // 4. Seed all globals (pages, header, footer, etc.) with media and font references
        await seedGlobals(payload, mediaMap, fontMap)

        // 5. Seed article authors (4 authors with avatars)
        const authors = await seedArticleAuthors(payload, mediaMap)

        // 6. Seed articles (10 articles with cover images)
        if (authors.length > 0) {
            await seedArticles(payload, authors, mediaMap)
        }

        // 7. Seed comments — fetch article IDs after seeding
        const articles = await payload.find({ collection: 'articles', limit: 20, depth: 0 })
        if (articles.docs.length > 0) {
            const articleInfos = articles.docs.map((a: any) => ({ id: a.id, title: a.title }))
            await seedComments(payload, articleInfos)
        }

        console.log('\n✨ Seed process completed successfully!')
        console.log('📊 Summary:')
        console.log('   • Admin user created')
        if (mediaMap) console.log('   • 30+ media images uploaded')
        if (fontMap) console.log('   • 3 Google Fonts uploaded (Playfair Display, Cormorant Garamond, Nunito)')
        console.log('   • 9 globals populated (Header, Footer, Home, About, Blog, Shop, Watch, Contact, Inner Circle)')
        console.log(`   • ${authors.length} article authors`)
        console.log(`   • ${articles.docs.length} articles`)
        console.log('   • 10 comments with threaded replies')
        console.log('\n🌐 Start the dev server: pnpm dev')
        process.exit(0)
    } catch (error) {
        console.error('❌ Seed process failed:', error)
        process.exit(1)
    }
}

void main()

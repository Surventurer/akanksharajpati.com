import { getPayloadClient } from '@/lib/payload/client'
import { seedRoles } from './seeders/roles.seeder'
import { seedAdmin } from './seeders/admin.seeder'
import { seedMedia } from './seeders/media.seeder'
import { seedGlobals } from './seeders/globals.seeder'
import { seedFonts } from './seeders/fonts.seeder'
import { seedArticleAuthors, seedArticles } from './seeders/articles.seeder'
import { seedComments } from './seeders/comments.seeder'

async function main() {
    const payload = await getPayloadClient()
    try {
        console.log('Starting seed process...\n')

        // 0. Seed roles (must be first — users depend on them)
        const roleMap = await seedRoles(payload)

        // 1. Seed admin user with Owner role + migrate existing legacy users
        await seedAdmin(payload, roleMap)

        // 2. Migrate any existing users that still have legacy string roles
        const legacyRoles = ['admin', 'editor']
        for (const legacy of legacyRoles) {
            const targetRole = legacy === 'admin' ? 'Owner' : 'Editor'
            const targetId = roleMap[targetRole]
            if (!targetId) continue

            const result = await payload.update({
                collection: 'users',
                where: { role: { equals: legacy } },
                data: { role: targetId } as any,
            })
            if (result.docs && result.docs.length > 0) {
                console.log(`Migrated ${result.docs.length} user(s) from legacy role "${legacy}" to "${targetRole}"`)
            }
        }

        // 3. Seed media files (creates ~30 images from picsum.photos)
        const mediaMap = await seedMedia(payload)

        // 4. Seed fonts (3 Google Fonts uploaded to Payload fonts collection)
        const fontMap = await seedFonts(payload)

        // 5. Seed all globals (pages, header, footer, etc.) with media and font references
        await seedGlobals(payload, mediaMap, fontMap)

        // 6. Seed article authors (4 authors with avatars)
        const authors = await seedArticleAuthors(payload, mediaMap)

        // 7. Seed articles (10 articles with cover images)
        if (authors.length > 0) {
            await seedArticles(payload, authors, mediaMap)
        }

        // 8. Seed comments — fetch article IDs after seeding
        const articles = await payload.find({ collection: 'articles', limit: 20, depth: 0 })
        if (articles.docs.length > 0) {
            const articleInfos = articles.docs.map((a: any) => ({ id: a.id, title: a.title }))
            await seedComments(payload, articleInfos)
        }

        console.log('\nSeed process completed successfully!')
        console.log('Summary:')
        console.log('   • Owner + Editor roles created')
        console.log('   • Admin user created with Owner role')
        if (roleMap) console.log('   • Legacy users migrated to proper roles')
        if (mediaMap) console.log('   • 30+ media images uploaded')
        if (fontMap) console.log('   • 3 Google Fonts uploaded (Playfair Display, Cormorant Garamond, Nunito)')
        console.log('   • 9 globals populated (Header, Footer, Home, About, Blog, Shop, Watch, Contact, Inner Circle)')
        console.log(`   • ${authors.length} article authors`)
        console.log(`   • ${articles.docs.length} articles`)
        console.log('   • 10 comments with threaded replies')
        console.log('\nStart the dev server: pnpm dev')
        process.exit(0)
    } catch (error) {
        console.error('Seed process failed:', error)
        process.exit(1)
    }
}

void main()

import { getPayloadClient } from '@/lib/payload/client'
import { seedAdmin } from './seeders/admin.seeder'
import { seedGlobals } from './seeders/globals.seeder'
import { seedArticleAuthors, seedArticles } from './seeders/articles.seeder'

async function main() {
    const payload = await getPayloadClient()
    try {
        console.log('🚀 Starting seed process...\n')
        
        // Seed admin user
        await seedAdmin(payload)
        
        // Seed all globals (pages, header, footer, etc.)
        await seedGlobals(payload)
        
        // Seed article authors and articles
        const author = await seedArticleAuthors(payload)
        if (author) {
            await seedArticles(payload, author.id)
        }
        
        console.log('\n✨ Seed process completed successfully!')
        process.exit(0)
    } catch (error) {
        console.error('❌ Seed process failed:', error)
        process.exit(1)
    }
}

void main()

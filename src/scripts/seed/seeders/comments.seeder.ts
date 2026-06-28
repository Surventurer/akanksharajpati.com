import { Payload } from 'payload'

interface ArticleInfo {
    id: string
    title: string
}

export async function seedComments(payload: Payload, articles: ArticleInfo[]) {
    console.log('🌱 Seeding comments...')

    const existingComments = await payload.find({
        collection: 'comments',
        limit: 1,
    })

    if (existingComments.docs.length > 0) {
        console.log('⏭️ Comments already exist, skipping...')
        return
    }

    const commentDefs: {
        content: string
        authorName: string
        status: 'approved' | 'pending' | 'rejected'
        articleIndex: number
        parentIndex?: number
    }[] = [
        // Article 0: The Art of Slow Living
        {
            content: 'This article spoke to my soul. I have been trying to incorporate slow living into my routine and your tips about morning tea rituals really resonated with me.',
            authorName: 'Sarah Mitchell',
            status: 'approved',
            articleIndex: 0,
        },
        {
            content: 'Absolutely beautiful perspective. I started my slow living journey last autumn and it has transformed my relationship with time.',
            authorName: 'Emma Watson-Lee',
            status: 'approved',
            articleIndex: 0,
            parentIndex: 0,
        },
        {
            content: 'Could you write more about how to balance slow living with a demanding career? That would be so helpful!',
            authorName: 'Priya Sharma',
            status: 'approved',
            articleIndex: 0,
        },

        // Article 1: Autumn Capsule Wardrobe
        {
            content: 'I have been waiting for this guide! The camel coat is indeed a game-changer. Would love to see a spring capsule wardrobe next.',
            authorName: 'Claire Dubois',
            status: 'approved',
            articleIndex: 1,
        },
        {
            content: 'Great tips on layering! I never knew how to style scarves properly until reading this.',
            authorName: 'Megan Foster',
            status: 'approved',
            articleIndex: 1,
            parentIndex: 3,
        },

        // Article 2: Creating Cozy Corners
        {
            content: 'The dried flower arrangement idea is genius! I just collected some eucalyptus from my garden and it looks stunning in a ceramic vase.',
            authorName: 'Laura Bennett',
            status: 'approved',
            articleIndex: 2,
        },

        // Article 3: Perfect Autumn Morning Routine
        {
            content: 'My mornings have completely changed since adopting this routine. The sunrise lamp recommendation was worth every penny!',
            authorName: 'Jessica Park',
            status: 'approved',
            articleIndex: 3,
        },
        {
            content: 'Would you recommend any specific herbal teas for autumn mornings? I am looking to switch from coffee.',
            authorName: 'Ananya Reddy',
            status: 'pending',
            articleIndex: 3,
        },

        // Article 4: Seasonal Cooking
        {
            content: 'Made the butternut squash soup last weekend and it was divine! My whole family loved it. Thank you for sharing this recipe.',
            authorName: 'Isabella Rossi',
            status: 'approved',
            articleIndex: 4,
        },
        {
            content: 'Could you share the full recipe with measurements? I tried recreating it but my ratios were off.',
            authorName: 'Hannah Kim',
            status: 'pending',
            articleIndex: 4,
            parentIndex: 8,
        },
    ]

    for (const def of commentDefs) {
        const article = articles[def.articleIndex]
        if (!article) continue

        const data: Record<string, unknown> = {
            content: def.content,
            authorName: def.authorName,
            status: def.status,
            article: article.id,
        }

        if (def.parentIndex !== undefined) {
            const parentComment = await payload.find({
                collection: 'comments',
                where: { authorName: { equals: commentDefs[def.parentIndex].authorName } },
                limit: 1,
                sort: 'createdAt',
            })
            if (parentComment.docs.length > 0) {
                data.parent = parentComment.docs[0].id
            }
        }

        await payload.create({
            collection: 'comments',
            data: data as any,
        })
    }

    console.log(`✅ ${commentDefs.length} comments seeded`)
}

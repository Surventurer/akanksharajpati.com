import { Payload } from 'payload'

export async function seedArticleAuthors(payload: Payload) {
    console.log('🌱 Seeding article authors...')

    // Check if author already exists
    const existingAuthors = await payload.find({
        collection: 'article-authors',
        limit: 1,
    })

    if (existingAuthors.docs.length > 0) {
        console.log('⏭️ Article authors already exist, skipping...')
        return existingAuthors.docs[0]
    }

    const author = await payload.create({
        collection: 'article-authors',
        draft: false,
        data: {
            name: 'Akanksha Rajpati',
            role: 'Founder & Creative Director',
            bio: 'A lifestyle curator and storyteller captivated by the poetry of changing seasons. Based in England, I dedicate my life to capturing fleeting beauty and sharing it with the world.',
        },
    })

    console.log('✅ Article author seeded')
    return author
}

export async function seedArticles(payload: Payload, authorId: string) {
    console.log('🌱 Seeding articles...')

    // Check if articles already exist
    const existingArticles = await payload.find({
        collection: 'articles',
        limit: 1,
    })

    if (existingArticles.docs.length > 0) {
        console.log('⏭️ Articles already exist, skipping...')
        return
    }

    const articles = [
        {
            title: 'The Art of Slow Living: A Guide to Intentional Days',
            slug: 'art-of-slow-living',
            category: 'Lifestyle',
            contentSummary: 'Discover the beauty of slowing down and embracing each moment with intention. This guide explores practical ways to incorporate mindfulness into your daily routine.',
            content: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: 'In our fast-paced world, the concept of slow living has become more than just a trend—it\'s a necessity for maintaining our wellbeing and finding joy in the everyday.' }],
                            version: 1,
                        },
                        {
                            type: 'heading',
                            tag: 'h2',
                            children: [{ text: 'What is Slow Living?' }],
                            version: 1,
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Slow living is about being present, savoring experiences, and prioritizing quality over quantity. It\'s waking up without rushing, enjoying your morning coffee without scrolling, and taking time to notice the changing light throughout the day.' }],
                            version: 1,
                        },
                        {
                            type: 'heading',
                            tag: 'h2',
                            children: [{ text: 'Starting Your Slow Living Journey' }],
                            version: 1,
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Begin small. Choose one moment each day to be fully present. Perhaps it\'s your morning tea, a walk around the block, or the golden hour before sunset. These moments of intentional presence become the foundation of a slower, more meaningful life.' }],
                            version: 1,
                        },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
            author: authorId,
            publishedAt: new Date('2026-01-15').toISOString(),
            readTimeInMins: 8,
            views: 2450,
        },
        {
            title: 'Autumn Capsule Wardrobe: Timeless Pieces for the Season',
            slug: 'autumn-capsule-wardrobe',
            category: 'Fashion',
            contentSummary: 'Build a versatile autumn wardrobe with these essential pieces that combine comfort, elegance, and timeless style for the transitional season.',
            content: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: 'As the leaves begin to turn and the air grows crisp, it\'s time to curate a wardrobe that embraces the beauty of autumn while remaining practical and elegant.' }],
                            version: 1,
                        },
                        {
                            type: 'heading',
                            tag: 'h2',
                            children: [{ text: 'The Foundation Pieces' }],
                            version: 1,
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Every great autumn wardrobe starts with quality basics: a well-fitted camel coat, cashmere sweaters in neutral tones, and perfectly broken-in denim. These pieces form the canvas upon which you can build countless looks.' }],
                            version: 1,
                        },
                        {
                            type: 'heading',
                            tag: 'h2',
                            children: [{ text: 'Layering is Key' }],
                            version: 1,
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Autumn weather is notoriously unpredictable. Master the art of layering with lightweight knits, versatile blazers, and scarves that can be worn multiple ways. The goal is adaptability without sacrificing style.' }],
                            version: 1,
                        },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
            author: authorId,
            publishedAt: new Date('2026-01-20').toISOString(),
            readTimeInMins: 6,
            views: 3200,
        },
        {
            title: 'Creating Cozy Corners: Interior Design for Autumn',
            slug: 'creating-cozy-corners',
            category: 'Home',
            contentSummary: 'Transform your living space into a warm sanctuary with these autumn-inspired interior design tips that blend comfort with sophisticated style.',
            content: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: 'There\'s something magical about creating a space that invites you to slow down, curl up with a good book, and watch the autumn light filter through the windows.' }],
                            version: 1,
                        },
                        {
                            type: 'heading',
                            tag: 'h2',
                            children: [{ text: 'The Power of Textiles' }],
                            version: 1,
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Swap out lightweight summer fabrics for rich, textured materials. Think chunky knit throws, velvet cushions, and linen curtains that filter the autumn light beautifully. These simple changes instantly transform the atmosphere of any room.' }],
                            version: 1,
                        },
                        {
                            type: 'heading',
                            tag: 'h2',
                            children: [{ text: 'Bringing Nature Indoors' }],
                            version: 1,
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Collect fallen branches, dried flowers, and natural elements from your autumn walks. Arranged thoughtfully, these found treasures become beautiful, cost-free décor that connects your space to the season.' }],
                            version: 1,
                        },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
            author: authorId,
            publishedAt: new Date('2026-01-25').toISOString(),
            readTimeInMins: 7,
            views: 1890,
        },
        {
            title: 'The Perfect Autumn Morning Routine',
            slug: 'perfect-autumn-morning-routine',
            category: 'Wellness',
            contentSummary: 'Start your autumn days with intention and warmth through this mindful morning routine designed to nourish body and soul.',
            content: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: 'The way we begin our mornings sets the tone for the entire day. In autumn, when the mornings are darker and cooler, having a nurturing routine becomes even more essential.' }],
                            version: 1,
                        },
                        {
                            type: 'heading',
                            tag: 'h2',
                            children: [{ text: 'Rise with the Light' }],
                            version: 1,
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Instead of fighting the darker mornings, embrace them. Use a sunrise lamp to wake gradually, giving your body time to adjust. These precious moments of soft light create a gentle transition into wakefulness.' }],
                            version: 1,
                        },
                        {
                            type: 'heading',
                            tag: 'h2',
                            children: [{ text: 'Warmth from Within' }],
                            version: 1,
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Begin with warm water and lemon, followed by your preferred warm beverage. Whether it\'s matcha, coffee, or herbal tea, make this ritual sacred. Use a beautiful cup, sit by a window, and simply be present.' }],
                            version: 1,
                        },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
            author: authorId,
            publishedAt: new Date('2026-01-28').toISOString(),
            readTimeInMins: 5,
            views: 4100,
        },
        {
            title: 'Seasonal Cooking: Embracing Autumn\'s Bounty',
            slug: 'seasonal-cooking-autumn-bounty',
            category: 'Food',
            contentSummary: 'Celebrate the harvest season with simple, nourishing recipes that highlight autumn\'s finest ingredients and warm the soul.',
            content: {
                root: {
                    type: 'root',
                    children: [
                        {
                            type: 'paragraph',
                            children: [{ text: 'Autumn brings a magnificent array of produce: butternut squash, apples, pears, root vegetables, and earthy mushrooms. Cooking seasonally means enjoying ingredients at their peak flavor while supporting local farmers.' }],
                            version: 1,
                        },
                        {
                            type: 'heading',
                            tag: 'h2',
                            children: [{ text: 'The Art of Simple Soups' }],
                            version: 1,
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Nothing says autumn like a pot of soup simmering on the stove. Start with quality stock, add seasonal vegetables, and let time do the work. A simple butternut squash soup with sage and a drizzle of cream becomes extraordinary when made with care.' }],
                            version: 1,
                        },
                        {
                            type: 'heading',
                            tag: 'h2',
                            children: [{ text: 'Baking with the Seasons' }],
                            version: 1,
                        },
                        {
                            type: 'paragraph',
                            children: [{ text: 'Fill your kitchen with the aromas of apple tarts, pear galettes, and spiced cookies. Autumn baking is comfort in its purest form—simple techniques, seasonal fruits, and warm spices that make the whole house feel like home.' }],
                            version: 1,
                        },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
            author: authorId,
            publishedAt: new Date('2026-02-01').toISOString(),
            readTimeInMins: 6,
            views: 2780,
        },
    ]

    for (const article of articles) {
        await payload.create({
            collection: 'articles',
            data: article as any,
        })
    }

    console.log('✅ Articles seeded')
}

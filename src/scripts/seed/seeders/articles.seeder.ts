import { Payload } from 'payload'
import { MediaMap } from './media.seeder'

interface AuthorInfo {
    id: string
    name: string
}

export async function seedArticleAuthors(payload: Payload, mediaMap: MediaMap | null): Promise<AuthorInfo[]> {
    console.log('🌱 Seeding article authors...')

    const existingAuthors = await payload.find({
        collection: 'article-authors',
        limit: 1,
    })

    if (existingAuthors.docs.length > 0) {
        console.log('⏭️ Article authors already exist, skipping...')
        const all = await payload.find({ collection: 'article-authors', limit: 10 })
        return all.docs as AuthorInfo[]
    }

    const authorDefs = [
        {
            name: 'Akanksha Rajpati',
            role: 'Founder & Creative Director',
            bio: 'A lifestyle curator and storyteller captivated by the poetry of changing seasons. Based in England, I dedicate my life to capturing fleeting beauty and sharing it with the world.',
            avatar: mediaMap?.avatarAkanksha,
        },
        {
            name: 'Elena Marchetti',
            role: 'Contributing Editor',
            bio: 'Italian-born journalist with a passion for sustainable fashion and mindful travel. Elena brings a European sensibility to every story she crafts.',
            avatar: mediaMap?.avatarElena,
        },
        {
            name: 'James Whitfield',
            role: 'Guest Writer',
            bio: 'A writer and photographer based in the Lake District, James explores the intersection of nature, design, and the art of living well.',
            avatar: mediaMap?.avatarJames,
        },
        {
            name: 'Sophia Chen',
            role: 'Lifestyle Contributor',
            bio: 'Taiwanese-American content creator focusing on wellness, seasonal beauty rituals, and the joy of intentional homemaking.',
            avatar: mediaMap?.avatarSophia,
        },
    ]

    const authors: AuthorInfo[] = []

    for (const def of authorDefs) {
        const data: Record<string, unknown> = {
            name: def.name,
            role: def.role,
            bio: def.bio,
        }
        if (def.avatar) {
            data.avatar = def.avatar
        }
        const author = await payload.create({
            collection: 'article-authors',
            draft: false,
            data: data as any,
        })
        authors.push({ id: author.id, name: author.name as string })
    }

    console.log(`✅ ${authors.length} article authors seeded`)
    return authors
}

export async function seedArticles(payload: Payload, authors: AuthorInfo[], mediaMap: MediaMap | null) {
    console.log('🌱 Seeding articles...')

    const existingArticles = await payload.find({
        collection: 'articles',
        limit: 1,
    })

    if (existingArticles.docs.length > 0) {
        console.log('⏭️ Articles already exist, skipping...')
        return
    }

    const getAuthorId = (name: string) => authors.find(a => a.name === name)?.id || authors[0].id

    const articles: Record<string, unknown>[] = [
        {
            title: 'The Art of Slow Living: A Guide to Intentional Days',
            category: 'Lifestyle',
            contentSummary: 'Discover the beauty of slowing down and embracing each moment with intention. This guide explores practical ways to incorporate mindfulness into your daily routine.',
            author: getAuthorId('Akanksha Rajpati'),
            publishedAt: new Date('2026-01-15').toISOString(),
            readTimeInMins: 8,
            views: 2450,
            coverImage: mediaMap?.cozyLiving,
            content: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'paragraph', children: [{ text: "In our fast-paced world, the concept of slow living has become more than just a trend—it's a necessity for maintaining our wellbeing and finding joy in the everyday." }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'What is Slow Living?' }], version: 1 },
                        { type: 'paragraph', children: [{ text: "Slow living is about being present, savoring experiences, and prioritizing quality over quantity. It's waking up without rushing, enjoying your morning coffee without scrolling, and taking time to notice the changing light throughout the day." }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Starting Your Slow Living Journey' }], version: 1 },
                        { type: 'paragraph', children: [{ text: "Begin small. Choose one moment each day to be fully present. Perhaps it's your morning tea, a walk around the block, or the golden hour before sunset. These moments of intentional presence become the foundation of a slower, more meaningful life." }], version: 1 },
                        { type: 'blockquote', children: [{ text: '"The soul becomes dyed with the color of its thoughts." — Marcus Aurelius' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Remember that slow living is not about doing everything at a snail\'s pace. It is about doing everything at the right pace—the pace that allows you to be fully present and engaged with whatever task is at hand.' }], version: 1 },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
        },
        {
            title: 'Autumn Capsule Wardrobe: Timeless Pieces for the Season',
            category: 'Fashion',
            contentSummary: 'Build a versatile autumn wardrobe with these essential pieces that combine comfort, elegance, and timeless style for the transitional season.',
            author: getAuthorId('Elena Marchetti'),
            publishedAt: new Date('2026-01-20').toISOString(),
            readTimeInMins: 6,
            views: 3200,
            coverImage: mediaMap?.fashionElegant,
            content: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'paragraph', children: [{ text: 'As the leaves begin to turn and the air grows crisp, it is time to curate a wardrobe that embraces the beauty of autumn while remaining practical and elegant.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'The Foundation Pieces' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Every great autumn wardrobe starts with quality basics: a well-fitted camel coat, cashmere sweaters in neutral tones, and perfectly broken-in denim. These pieces form the canvas upon which you can build countless looks.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Layering is Key' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Autumn weather is notoriously unpredictable. Master the art of layering with lightweight knits, versatile blazers, and scarves that can be worn multiple ways. The goal is adaptability without sacrificing style.' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Invest in quality fabrics—wool, cashmere, organic cotton, and linen. These natural fibers not only feel better against the skin but also regulate temperature naturally, keeping you comfortable as the day warms and cools.' }], version: 1 },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
        },
        {
            title: 'Creating Cozy Corners: Interior Design for Autumn',
            category: 'Home',
            contentSummary: 'Transform your living space into a warm sanctuary with these autumn-inspired interior design tips that blend comfort with sophisticated style.',
            author: getAuthorId('Akanksha Rajpati'),
            publishedAt: new Date('2026-01-25').toISOString(),
            readTimeInMins: 7,
            views: 1890,
            coverImage: mediaMap?.homeInterior,
            content: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'paragraph', children: [{ text: "There's something magical about creating a space that invites you to slow down, curl up with a good book, and watch the autumn light filter through the windows." }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'The Power of Textiles' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Swap out lightweight summer fabrics for rich, textured materials. Think chunky knit throws, velvet cushions, and linen curtains that filter the autumn light beautifully. These simple changes instantly transform the atmosphere of any room.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Bringing Nature Indoors' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Collect fallen branches, dried flowers, and natural elements from your autumn walks. Arranged thoughtfully, these found treasures become beautiful, cost-free decor that connects your space to the season.' }], version: 1 },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
        },
        {
            title: 'The Perfect Autumn Morning Routine',
            category: 'Wellness',
            contentSummary: 'Start your autumn days with intention and warmth through this mindful morning routine designed to nourish body and soul.',
            author: getAuthorId('Sophia Chen'),
            publishedAt: new Date('2026-01-28').toISOString(),
            readTimeInMins: 5,
            views: 4100,
            coverImage: mediaMap?.morningWellness,
            content: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'paragraph', children: [{ text: 'The way we begin our mornings sets the tone for the entire day. In autumn, when the mornings are darker and cooler, having a nurturing routine becomes even more essential.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Rise with the Light' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Instead of fighting the darker mornings, embrace them. Use a sunrise lamp to wake gradually, giving your body time to adjust. These precious moments of soft light create a gentle transition into wakefulness.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Warmth from Within' }], version: 1 },
                        { type: 'paragraph', children: [{ text: "Begin with warm water and lemon, followed by your preferred warm beverage. Whether it is matcha, coffee, or herbal tea, make this ritual sacred. Use a beautiful cup, sit by a window, and simply be present." }], version: 1 },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
        },
        {
            title: "Seasonal Cooking: Embracing Autumn's Bounty",
            category: 'Food',
            contentSummary: "Celebrate the harvest season with simple, nourishing recipes that highlight autumn's finest ingredients and warm the soul.",
            author: getAuthorId('Akanksha Rajpati'),
            publishedAt: new Date('2026-02-01').toISOString(),
            readTimeInMins: 6,
            views: 2780,
            coverImage: mediaMap?.cookingAutumn,
            content: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'paragraph', children: [{ text: 'Autumn brings a magnificent array of produce: butternut squash, apples, pears, root vegetables, and earthy mushrooms. Cooking seasonally means enjoying ingredients at their peak flavor while supporting local farmers.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'The Art of Simple Soups' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Nothing says autumn like a pot of soup simmering on the stove. Start with quality stock, add seasonal vegetables, and let time do the work. A simple butternut squash soup with sage and a drizzle of cream becomes extraordinary when made with care.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Baking with the Seasons' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Fill your kitchen with the aromas of apple tarts, pear galettes, and spiced cookies. Autumn baking is comfort in its purest form—simple techniques, seasonal fruits, and warm spices that make the whole house feel like home.' }], version: 1 },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
        },
        {
            title: 'A Weekend in the Cotswolds: Travel Guide',
            category: 'Travel',
            contentSummary: 'Escape to the rolling hills of the Cotswolds with this curated travel guide featuring charming villages, scenic walks, and cozy accommodations.',
            author: getAuthorId('James Whitfield'),
            publishedAt: new Date('2026-02-10').toISOString(),
            readTimeInMins: 9,
            views: 1850,
            coverImage: mediaMap?.travelEurope,
            content: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'paragraph', children: [{ text: 'There are few places in England that capture the imagination quite like the Cotswolds. With its honey-colored stone cottages, rolling green hills, and winding country lanes, this Area of Outstanding Natural Beauty feels like stepping into a storybook.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Where to Stay' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'For the full experience, book a stay at a historic inn or a converted barn. The Fox Hollow in Bourton-on-the-Water offers crackling fireplaces, four-poster beds, and breakfast made with locally sourced ingredients.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Must-Visit Villages' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Start in Castle Combe, often called the prettiest village in England. Then wander through Bibury, with its iconic Arlington Row cottages. End your day in Stow-on-the-Wold for antique shopping and a pint at a centuries-old pub.' }], version: 1 },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
        },
        {
            title: 'Sustainable Living: Small Changes, Big Impact',
            category: 'Sustainability',
            contentSummary: 'Explore practical ways to reduce your environmental footprint without sacrificing style or comfort. Small mindful changes lead to meaningful impact.',
            author: getAuthorId('Elena Marchetti'),
            publishedAt: new Date('2026-02-15').toISOString(),
            readTimeInMins: 7,
            views: 1560,
            coverImage: mediaMap?.natureWalk,
            content: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'paragraph', children: [{ text: 'Sustainability is not about perfection—it is about progress. Every small choice we make ripples outward, shaping a better future for our planet and generations to come.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Mindful Consumption' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Before making a purchase, ask yourself: Do I truly need this? Will it last? Can I source it second-hand or from a sustainable brand? This simple pause can transform your consumption habits.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'The Capsule Approach' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Apply the capsule philosophy to more than just your wardrobe. A capsule kitchen with quality essentials, a capsule beauty routine with multi-use products, and a capsule home with timeless decor pieces all contribute to a more sustainable lifestyle.' }], version: 1 },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
        },
        {
            title: 'The Art of Autumn Tablescaping',
            category: 'Home',
            contentSummary: 'Set a stunning autumn table with foraged elements, warm textures, and earthy tones that celebrate the seasons natural beauty.',
            author: getAuthorId('Sophia Chen'),
            publishedAt: new Date('2026-02-20').toISOString(),
            readTimeInMins: 5,
            views: 1230,
            coverImage: mediaMap?.homeInterior,
            content: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'paragraph', children: [{ text: 'Tablescaping is the art of arranging a table with intention and creativity. In autumn, nature provides the most exquisite palette—amber, rust, deep green, and burnished gold.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Start with a Foundation' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Choose a linen tablecloth in a warm neutral tone, or let the natural wood of your table shine through. Layer with chargers in earthy ceramic or woven rattan for texture.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Nature as Decor' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'Create a centerpiece using seasonal elements: mini pumpkins, dried hydrangeas, eucalyptus branches, and pillar candles in amber glass holders. The key is abundance with restraint—let each element breathe.' }], version: 1 },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
        },
        {
            title: 'Why I Left the City for the English Countryside',
            category: 'Lifestyle',
            contentSummary: 'A personal essay on trading city chaos for country calm, and discovering a richer, slower pace of life in the heart of rural England.',
            author: getAuthorId('Akanksha Rajpati'),
            publishedAt: new Date('2026-02-25').toISOString(),
            readTimeInMins: 10,
            views: 5670,
            coverImage: mediaMap?.cozyLiving,
            content: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'paragraph', children: [{ text: 'Two years ago, I made a decision that changed everything: I left my apartment in London and moved to a small cottage in the Cotswolds. Everyone thought I was having a mid-life crisis. In reality, I was having a clarity.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'The Breaking Point' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'It wasn\'t a single dramatic event but a thousand small realizations. The constant noise. The endless scrolling. The feeling of being busy but not fulfilled. I realized I was living someone else\'s idea of a successful life.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Finding Home' }], version: 1 },
                        { type: 'paragraph', children: [{ text: "My cottage has a garden where I now grow herbs and flowers. There is a wood-burning stove that crackles through autumn evenings. The nearest shop is a 15-minute walk through fields. And I have never felt richer. The quiet here is not empty—it is full." }], version: 1 },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
        },
        {
            title: 'Autumn Fashion in Paris: Street Style Guide',
            category: 'Fashion',
            contentSummary: 'Parisian street style meets autumn elegance. Discover how French women style the transitional season with effortless grace and timeless pieces.',
            author: getAuthorId('Elena Marchetti'),
            publishedAt: new Date('2026-03-01').toISOString(),
            readTimeInMins: 5,
            views: 2980,
            coverImage: mediaMap?.fashionElegant,
            content: {
                root: {
                    type: 'root',
                    children: [
                        { type: 'paragraph', children: [{ text: 'Paris in autumn is a masterclass in effortless style. The city itself becomes a runway, with Parisiennes navigating cobblestone streets in perfectly tailored coats and silk scarves.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'The Parisian Formula' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'The secret to Parisian style is deceptively simple: invest in exceptional basics, add one statement piece, and never appear to have tried too hard. A well-worn leather jacket, straight-leg jeans, and a silk blouse are the holy trinity of French autumn fashion.' }], version: 1 },
                        { type: 'heading', tag: 'h2', children: [{ text: 'Accessories Matter' }], version: 1 },
                        { type: 'paragraph', children: [{ text: 'A scarf is not just for warmth—it is the defining accessory of autumn. Master the art of tying a silk scarf, invest in quality leather gloves, and never underestimate the power of a good handbag to elevate even the simplest outfit.' }], version: 1 },
                    ],
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                },
            },
        },
    ]

    for (const article of articles) {
        await payload.create({
            collection: 'articles',
            data: article as any,
        })
    }

    console.log(`✅ ${articles.length} articles seeded`)
}

import { Payload } from 'payload'
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url'

export interface MediaMap {
    heroAutumn: string
    heroAbout: string
    cozyLiving: string
    fashionElegant: string
    homeInterior: string
    morningWellness: string
    cookingAutumn: string
    travelEurope: string
    natureWalk: string
    journalProduct: string
    digitalPlanner: string
    stationerySet: string
    candleProduct: string
    bookmarkSet: string
    wallArt: string
    videoThumbnail1: string
    videoThumbnail2: string
    videoThumbnail3: string
    videoThumbnail4: string
    mustWatch1: string
    mustWatch2: string
    mustWatch3: string
    avatarAkanksha: string
    avatarElena: string
    avatarJames: string
    avatarSophia: string
    signatureImage: string
    playlistCover1: string
    playlistCover2: string
    playlistCover3: string
    valueIcon1: string
    valueIcon2: string
    valueIcon3: string
}

const imageDefs: { key: keyof MediaMap; seed: string; width: number; height: number }[] = [
    // Hero & featured images
    { key: 'heroAutumn', seed: 'autumn-landscape', width: 1600, height: 900 },
    { key: 'heroAbout', seed: 'portrait-elegance', width: 1200, height: 1500 },
    { key: 'signatureImage', seed: 'handwriting-signature', width: 400, height: 200 },

    // Article cover images
    { key: 'cozyLiving', seed: 'cozy-living-room', width: 800, height: 1000 },
    { key: 'fashionElegant', seed: 'fashion-autumn', width: 800, height: 1000 },
    { key: 'homeInterior', seed: 'interior-design', width: 800, height: 1000 },
    { key: 'morningWellness', seed: 'morning-coffee', width: 800, height: 1000 },
    { key: 'cookingAutumn', seed: 'autumn-cooking', width: 800, height: 1000 },
    { key: 'travelEurope', seed: 'travel-england', width: 800, height: 1000 },
    { key: 'natureWalk', seed: 'forest-autumn', width: 800, height: 1000 },

    // Shop product images
    { key: 'journalProduct', seed: 'journal-book', width: 600, height: 800 },
    { key: 'digitalPlanner', seed: 'digital-tablet', width: 600, height: 800 },
    { key: 'stationerySet', seed: 'stationery-elegant', width: 600, height: 800 },
    { key: 'candleProduct', seed: 'candle-cozy', width: 600, height: 800 },
    { key: 'bookmarkSet', seed: 'bookmark-design', width: 600, height: 800 },
    { key: 'wallArt', seed: 'wall-art-print', width: 600, height: 800 },

    // Video thumbnails
    { key: 'videoThumbnail1', seed: 'cotswolds-view', width: 800, height: 450 },
    { key: 'videoThumbnail2', seed: 'paris-vintage', width: 800, height: 450 },
    { key: 'videoThumbnail3', seed: 'wardrobe-styling', width: 800, height: 450 },
    { key: 'videoThumbnail4', seed: 'candle-making', width: 800, height: 450 },

    // Must watch thumbnails
    { key: 'mustWatch1', seed: 'morning-routine', width: 400, height: 225 },
    { key: 'mustWatch2', seed: 'shopping-paris', width: 400, height: 225 },
    { key: 'mustWatch3', seed: 'capsule-wardrobe', width: 400, height: 225 },

    // Author avatars
    { key: 'avatarAkanksha', seed: 'woman-portrait-1', width: 300, height: 300 },
    { key: 'avatarElena', seed: 'woman-portrait-2', width: 300, height: 300 },
    { key: 'avatarJames', seed: 'man-portrait-1', width: 300, height: 300 },
    { key: 'avatarSophia', seed: 'woman-portrait-3', width: 300, height: 300 },

    // Playlist covers
    { key: 'playlistCover1', seed: 'travel-destinations', width: 600, height: 400 },
    { key: 'playlistCover2', seed: 'beauty-products', width: 600, height: 400 },
    { key: 'playlistCover3', seed: 'fashion-lookbook', width: 600, height: 400 },

    // About page value icons
    { key: 'valueIcon1', seed: 'icon-mindfulness', width: 200, height: 200 },
    { key: 'valueIcon2', seed: 'icon-seasons', width: 200, height: 200 },
    { key: 'valueIcon3', seed: 'icon-creativity', width: 200, height: 200 },
]

export async function seedMedia(payload: Payload): Promise<MediaMap> {
    console.log('🌱 Seeding media files...')

    const existingMedia = await payload.find({
        collection: 'media',
        limit: 40,
        sort: 'createdAt',
        depth: 0,
    })

    if (existingMedia.docs.length >= imageDefs.length) {
        console.log('⏭️ Media already exists, reusing existing...')
        const mediaMap: Partial<MediaMap> = {}
        for (let i = 0; i < imageDefs.length; i++) {
            const doc = existingMedia.docs[i]
            if (doc) {
                mediaMap[imageDefs[i].key] = doc.id
            }
        }
        return mediaMap as MediaMap
    }

    const mediaMap: Partial<MediaMap> = {}
    let count = 0

    for (const def of imageDefs) {
        const url = `https://picsum.photos/seed/${def.seed}/${def.width}/${def.height}`
        const media = await createMediaFromImageUrl(payload, url)
        if (media?.id) {
            mediaMap[def.key] = media.id
            count++
            console.log(`  ✅ ${def.key} (${def.seed})`)
        } else {
            console.warn(`  ⚠️ Failed to create: ${def.key}`)
        }
    }

    console.log(`✅ ${count} media files seeded`)
    return mediaMap as MediaMap
}

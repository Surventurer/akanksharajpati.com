import { Payload } from 'payload'
import { faker } from '@faker-js/faker'

export interface FontMap {
    playfairDisplay: string
    cormorantGaramond: string
    nunito: string
}

const FONT_BASE = 'https://raw.githubusercontent.com/google/fonts/main/ofl'

const fontDefs: {
    key: keyof FontMap
    name: string
    url: string
}[] = [
    {
        key: 'playfairDisplay',
        name: 'Playfair Display',
        url: `${FONT_BASE}/playfairdisplay/PlayfairDisplay%5Bwght%5D.ttf`,
    },
    {
        key: 'cormorantGaramond',
        name: 'Cormorant Garamond',
        url: `${FONT_BASE}/cormorantgaramond/CormorantGaramond%5Bwght%5D.ttf`,
    },
    {
        key: 'nunito',
        name: 'Nunito',
        url: `${FONT_BASE}/nunito/Nunito%5Bwght%5D.ttf`,
    },
]

export async function seedFonts(payload: Payload): Promise<FontMap> {
    console.log('🌱 Seeding fonts...')

    const existingFonts = await payload.find({
        collection: 'fonts',
        limit: 10,
        sort: 'createdAt',
        depth: 0,
    })

    if (existingFonts.docs.length >= fontDefs.length) {
        console.log('⏭️ Fonts already exist, reusing existing...')
        const fontMap: Partial<FontMap> = {}
        for (let i = 0; i < fontDefs.length; i++) {
            const doc = existingFonts.docs[i]
            if (doc) {
                fontMap[fontDefs[i].key] = doc.id
            }
        }
        return fontMap as FontMap
    }

    async function uploadFont(name: string, url: string) {
        const res = await fetch(url)
        if (!res.ok) throw new Error(`Failed to fetch font: ${url} (${res.status})`)
        const arrBuffer = await res.arrayBuffer()
        const buffer = Buffer.from(arrBuffer)
        const filename = decodeURIComponent(url.split('/').pop()?.split('?')[0] || `${name}.ttf`)

        return payload.create({
            collection: 'fonts',
            draft: false,
            data: {
                name,
            },
            file: {
                data: buffer,
                name: filename,
                mimetype: 'font/ttf',
                size: buffer.length,
            },
        })
    }

    const fontMap: Partial<FontMap> = {}

    for (const def of fontDefs) {
        try {
            const font = await uploadFont(def.name, def.url)
            if (font?.id) {
                fontMap[def.key] = font.id
                console.log(`  ✅ ${def.name}`)
            }
        } catch (error) {
            console.error(`  ❌ Failed to upload ${def.name}:`, error)
        }
    }

    console.log(`✅ ${Object.keys(fontMap).length} fonts seeded`)
    return fontMap as FontMap
}

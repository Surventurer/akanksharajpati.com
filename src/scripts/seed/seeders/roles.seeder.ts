import { Payload } from 'payload'
import { isDuplicateError } from '../lib/is-duplicate-error'

export type RoleMap = Record<string, string>

export async function seedRoles(payload: Payload): Promise<RoleMap> {
    const roleMap: RoleMap = {}

    const roles = [
        {
            name: 'Owner',
            description: 'Full access to all resources',
            isOwner: true,
            content: {
                articles: { read: true, create: true, update: true, delete: true },
                articleAuthors: { read: true, create: true, update: true, delete: true },
                comments: { read: true, create: true, update: true, delete: true },
            },
            pages: {
                homePage: { read: true, update: true },
                blogPage: { read: true, update: true },
                aboutPage: { read: true, update: true },
                shopPage: { read: true, update: true },
                contactPage: { read: true, update: true },
                watchPage: { read: true, update: true },
            },
            design: {
                header: { read: true, update: true },
                footer: { read: true, update: true },
                joinOurInnerCircle: { read: true, update: true },
            },
            media: {
                mediaFiles: { read: true, create: true, update: true, delete: true },
                fonts: { read: true, create: true, update: true, delete: true },
            },
            admin: {
                users: { read: true, create: true, update: true, delete: true },
                roles: { read: true, create: true, update: true, delete: true },
            },
        },
        {
            name: 'Editor',
            description: 'Can manage content and media, but not settings',
            isOwner: false,
            content: {
                articles: { read: true, create: true, update: true, delete: true },
                articleAuthors: { read: true, create: true, update: true, delete: true },
                comments: { read: true, create: true, update: true, delete: false },
            },
            pages: {
                homePage: { read: true, update: false },
                blogPage: { read: true, update: false },
                aboutPage: { read: true, update: false },
                shopPage: { read: true, update: false },
                contactPage: { read: true, update: false },
                watchPage: { read: true, update: false },
            },
            design: {
                header: { read: true, update: false },
                footer: { read: true, update: false },
                joinOurInnerCircle: { read: true, update: false },
            },
            media: {
                mediaFiles: { read: true, create: true, update: true, delete: true },
                fonts: { read: true, create: true, update: true, delete: true },
            },
            admin: {
                users: { read: false, create: false, update: false, delete: false },
                roles: { read: false, create: false, update: false, delete: false },
            },
        },
    ]

    for (const role of roles) {
        try {
            const existing = await payload.find({
                collection: 'roles',
                where: { name: { equals: role.name } },
                depth: 0,
                limit: 1,
            })

            if (existing.docs.length > 0) {
                const updated = await payload.update({
                    collection: 'roles',
                    id: existing.docs[0].id,
                    data: role,
                })
                roleMap[role.name] = updated.id
                console.log(`Role "${role.name}" updated`)
            } else {
                const created = await payload.create({
                    collection: 'roles',
                    data: role,
                })
                roleMap[role.name] = created.id
                console.log(`Role "${role.name}" created`)
            }
        } catch (error: unknown) {
            if (isDuplicateError(error, 'name')) {
                console.log(`Role "${role.name}" already exists`)
            } else {
                console.error(`Error seeding role "${role.name}":`, error)
            }
        }
    }

    return roleMap
}

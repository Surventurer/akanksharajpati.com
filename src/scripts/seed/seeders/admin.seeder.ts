import { Payload } from 'payload'
import { isDuplicateError } from '../lib/is-duplicate-error'
import { env } from '@/lib/env'
import type { RoleMap } from './roles.seeder'

export async function seedAdmin(payload: Payload, roleMap: RoleMap) {
    const ownerRoleId = roleMap['Owner']
    const editorRoleId = roleMap['Editor']

    if (!ownerRoleId) {
        console.error('Owner role not found — skipping admin seed')
        return
    }

    // ─── Admin / Owner user ───────────────────────────────
    try {
        await payload.create({
            collection: 'users',
            data: {
                name: 'Admin',
                email: env.CMS_SEED_ADMIN_EMAIL,
                password: env.CMS_SEED_ADMIN_PASSWORD,
                role: ownerRoleId,
            },
        })
        console.log('Admin user created with Owner role')
    } catch (error: unknown) {
        if (isDuplicateError(error, 'email')) {
            try {
                const existing = await payload.find({
                    collection: 'users',
                    where: { email: { equals: env.CMS_SEED_ADMIN_EMAIL } },
                    depth: 0,
                    limit: 1,
                })
                if (existing.docs.length > 0) {
                    const user = existing.docs[0]
                    const currentRole = (user as any).role
                    if (typeof currentRole === 'string' && currentRole.length !== 24) {
                        await payload.update({
                            collection: 'users',
                            id: user.id,
                            data: { role: ownerRoleId },
                        })
                        console.log('Admin user role migrated to Owner')
                    } else {
                        console.log('Admin user already exists with valid role')
                    }
                }
            } catch {
                console.log('Admin user already exists')
            }
        } else {
            console.error('Error seeding admin user:', JSON.stringify(error, null, 2))
        }
    }

    // ─── Editor test user ─────────────────────────────────
    if (!editorRoleId) {
        console.error('Editor role not found — skipping editor test user')
        return
    }

    const editorEmail = 'editor@akanksharajpati.com'
    try {
        await payload.create({
            collection: 'users',
            data: {
                name: 'Editor',
                email: editorEmail,
                password: 'editorpassword',
                role: editorRoleId,
            },
        })
        console.log(`Editor test user created: ${editorEmail} / editorpassword`)
    } catch (error: unknown) {
        if (isDuplicateError(error, 'email')) {
            try {
                const existing = await payload.find({
                    collection: 'users',
                    where: { email: { equals: editorEmail } },
                    depth: 0,
                    limit: 1,
                })
                if (existing.docs.length > 0) {
                    const user = existing.docs[0]
                    const currentRole = (user as any).role
                    if (typeof currentRole === 'string' && currentRole.length !== 24) {
                        await payload.update({
                            collection: 'users',
                            id: user.id,
                            data: { role: editorRoleId },
                        })
                        console.log('Editor user role migrated')
                    } else {
                        console.log('Editor user already exists with valid role')
                    }
                }
            } catch {
                console.log('Editor user already exists')
            }
        } else {
            console.error('Error seeding editor user:', JSON.stringify(error, null, 2))
        }
    }
}

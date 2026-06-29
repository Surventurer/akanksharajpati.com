import type { PayloadRequest } from 'payload'

const roleCache = new WeakMap<PayloadRequest, Record<string, any>>()

async function getRoleForUser(req: PayloadRequest): Promise<any | null> {
    const user = req.user
    if (!user) return null

    const role = (user as any).role
    if (typeof role === 'object' && role !== null && role.permissions) {
        return role
    }

    const roleId = typeof role === 'string' ? role : role?.id
    if (!roleId) return null

    // Guard: roleId must be a valid 24-char hex ObjectId
    // Prevents CastError for legacy string values like "admin" or "editor"
    if (typeof roleId === 'string' && !/^[0-9a-fA-F]{24}$/.test(roleId)) {
        return null
    }

    const cached = roleCache.get(req)
    if (cached && cached[roleId]) {
        return cached[roleId]
    }

    try {
        const roleDoc = await req.payload.findByID({
            collection: 'roles',
            id: roleId,
            depth: 0,
            req,
        })

        const cache = roleCache.get(req) || {}
        cache[roleId] = roleDoc
        roleCache.set(req, cache)

        return roleDoc
    } catch {
        return null
    }
}

type PermissionCategory = 'content' | 'pages' | 'design' | 'media' | 'admin'
type PermissionAction = 'read' | 'create' | 'update' | 'delete'

export async function checkPermission(
    req: PayloadRequest,
    category: PermissionCategory,
    resource: string,
    action: PermissionAction,
): Promise<boolean> {
    const user = req.user
    if (!user) return false

    const role = await getRoleForUser(req)
    if (!role) return false

    if (role.isOwner) return true

    try {
        const categoryObj = role[category]
        if (!categoryObj) return false
        const resourceObj = categoryObj[resource]
        if (!resourceObj) return false
        return !!resourceObj[action]
    } catch {
        return false
    }
}

export async function isOwner(req: PayloadRequest): Promise<boolean> {
    const user = req.user
    if (!user) return false

    const role = await getRoleForUser(req)
    return !!role?.isOwner
}

export function isLoggedIn({ req }: { req: PayloadRequest }): boolean {
    return !!req.user
}

export function collectionAccess(
    category: PermissionCategory,
    resource: string,
    options?: { publicRead?: boolean; publicCreate?: boolean },
) {
    return {
        read: options?.publicRead
            ? () => true
            : ({ req }: { req: PayloadRequest }) => checkPermission(req, category, resource, 'read'),
        create: options?.publicCreate
            ? () => true
            : ({ req }: { req: PayloadRequest }) => checkPermission(req, category, resource, 'create'),
        update: ({ req }: { req: PayloadRequest }) => checkPermission(req, category, resource, 'update'),
        delete: ({ req }: { req: PayloadRequest }) => checkPermission(req, category, resource, 'delete'),
    }
}

export function globalAccess(
    category: PermissionCategory,
    resource: string,
) {
    return {
        read: () => true,
        update: ({ req }: { req: PayloadRequest }) => checkPermission(req, category, resource, 'update'),
    }
}

export function usersAccess() {
    return {
        read: async ({ req }: { req: PayloadRequest }) => {
            if (!req.user) return false
            const hasRead = await checkPermission(req, 'admin', 'users', 'read')
            if (hasRead) return true
            return { id: { equals: req.user.id } }
        },
        create: ({ req }: { req: PayloadRequest }) => checkPermission(req, 'admin', 'users', 'create'),
        update: async ({ req }: { req: PayloadRequest }) => {
            if (!req.user) return false
            const hasUpdate = await checkPermission(req, 'admin', 'users', 'update')
            if (hasUpdate) return true
            return { id: { equals: req.user.id } }
        },
        delete: ({ req }: { req: PayloadRequest }) => checkPermission(req, 'admin', 'users', 'delete'),
        admin: async ({ req }: { req: PayloadRequest }) => {
            return !!req.user
        },
    }
}

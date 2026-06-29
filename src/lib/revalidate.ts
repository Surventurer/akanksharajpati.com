import type { CacheTag } from './cache-tags'

export function createRevalidateHook(tag: CacheTag) {
  return async () => {
    try {
      const { revalidateTag } = await import('next/cache')
      revalidateTag(tag, 'max')
    } catch {
      // Ignore outside Next.js context (seeding, build, etc.)
    }
  }
}

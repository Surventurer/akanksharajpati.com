import type { CacheTag } from './cache-tags'

export function createRevalidateHook(tag: CacheTag, path?: string) {
  return async () => {
    if (typeof window !== 'undefined') return
    try {
      const { revalidateTag, revalidatePath } = await import('next/cache')
      // @ts-ignore
      revalidateTag(tag)
      if (path) {
        revalidatePath(path)
      }
    } catch {
      // Ignore outside Next.js context (seeding, build, etc.)
    }
  }
}

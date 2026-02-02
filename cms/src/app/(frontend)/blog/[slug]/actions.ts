'use server'

import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { revalidatePath } from 'next/cache'

export async function incrementViewCount(articleId: string) {
    const payload = await getPayload({ config: configPromise })

    // It's best to handle errors gracefully so the UI doesn't crash if this fails
    try {
        const article = await payload.findByID({
            collection: 'articles',
            id: articleId,
        })

        if (article) {
            await payload.update({
                collection: 'articles',
                id: articleId,
                data: {
                    views: (article.views || 0) + 1,
                },
            })
            // no need to revalidate path for view count mostly, unless we show it real time
        }
    } catch (error) {
        console.error('Error incrementing view count:', error)
    }
}

export async function submitComment(prevState: any, formData: FormData) {
    const payload = await getPayload({ config: configPromise })

    const articleId = formData.get('articleId') as string
    const name = formData.get('name') as string
    const email = formData.get('email') as string || '' // Optional
    const content = formData.get('content') as string
    const slug = formData.get('slug') as string

    if (!articleId || !name || !content) {
        return { success: false, message: 'Name and Comment are required' }
    }

    try {
        await payload.create({
            collection: 'comments',
            data: {
                article: articleId,
                authorName: name,
                authorEmail: email,
                content: content,
                status: 'pending',
            },
        })

        // Revalidate the blog post so the successful message helps or if we auto-approve
        revalidatePath(`/blog/${slug}`)

        return { success: true, message: 'Comment submitted for approval!' }
    } catch (error) {
        console.error('Error submitting comment:', error)
        return { success: false, message: 'Failed to submit comment.' }
    }
}

'use client'

import { useActionState, useState } from 'react'
import { submitComment } from '@/app/(frontend)/blog/[slug]/actions'
import { useFormStatus } from 'react-dom'

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <button
            type="submit"
            disabled={pending}
            className="px-6 py-2 bg-primary text-primary-foreground font-bold text-xs uppercase hover:bg-primary/90 transition-colors disabled:opacity-50 rounded-full"
        >
            {pending ? 'Sending...' : 'Send'}
        </button>
    )
}

export const Comments = ({ articleId, slug, comments }: { articleId: string, slug: string, comments: any[] }) => {
    const [state, formAction] = useActionState(submitComment, null)
    const [isUnlocked, setIsUnlocked] = useState(false)

    const handleUnlock = (e: React.MouseEvent) => {
        e.preventDefault()
        // Here you would trigger the subscribe flow
        // For now, we just simulate a success/unlock
        // In a real app, this would open a modal
        const subscribed = confirm("Join our circle to leave a comment! Subscribe now?")
        if (subscribed) {
            setIsUnlocked(true)
        }
    }

    return (
        <section className="flex flex-col gap-4">
            <h3 className="font-display text-lg font-bold px-1">Comments ({comments.length})</h3>

            {/* Threaded Comments List */}
            <div className="h-[250px] space-y-6 overflow-y-auto pr-2 custom-scrollbar">
                {comments.filter((c: any) => !c.parent).length === 0 ? (
                    <div className="text-center py-8 opacity-50">
                        <span className="material-symbols-outlined text-3xl mb-2">chat_bubble_outline</span>
                        <p className="text-xs">Start the conversation</p>
                    </div>
                ) : (
                    comments.filter((c: any) => !c.parent).map((comment: any) => {
                        const isAuthor = comment.authorName === 'Admin' || comment.authorName === 'Akanksha Rajpati';
                        const initial = comment.authorName.charAt(0).toUpperCase();

                        // Find replies
                        const replies = comments.filter((c: any) => {
                            const pId = typeof c.parent === 'object' ? c.parent?.id : c.parent;
                            return pId === comment.id;
                        });

                        return (
                            <div key={comment.id} className="group">
                                {/* Parent Comment */}
                                <div className="flex gap-3 relative z-10">
                                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${isAuthor ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                                        }`}>
                                        {isAuthor ? <span className="material-symbols-outlined text-[14px]">stars</span> : initial}
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <span className={`text-sm font-bold ${isAuthor ? 'bg-primary/10 px-2 py-0.5 rounded-full text-primary' : ''}`}>
                                                {comment.authorName}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground/60">
                                                {new Date(comment.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <p className="text-sm text-foreground/90 leading-relaxed font-serif">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>

                                {/* Replies */}
                                {replies.map((reply: any) => {
                                    const replyIsAuthor = reply.authorName === 'Admin' || reply.authorName === 'Akanksha Rajpati';
                                    const replyInitial = reply.authorName.charAt(0).toUpperCase();

                                    return (
                                        <div key={reply.id} className="relative mt-3 ml-0 flex gap-3">
                                            {/* Connector Line */}
                                            {/* From User Avatar Center (16px) down and right */}
                                            <div className="absolute -top-7 left-[15px] w-5 h-10 border-l border-b border-foreground/20 rounded-bl-xl"></div>

                                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ml-8 relative z-10 bg-background ring-2 ring-background">
                                                <div className={`w-full h-full rounded-full flex items-center justify-center ${replyIsAuthor ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'
                                                    }`}>
                                                    {replyIsAuthor ? <span className="material-symbols-outlined text-[14px]">stars</span> : replyInitial}
                                                </div>
                                            </div>

                                            <div className="flex-1 pt-1">
                                                <div className="flex items-center gap-2 mb-0.5">
                                                    <span className={`text-sm font-bold ${replyIsAuthor ? 'bg-primary/10 px-2 py-0.5 rounded-full text-primary' : ''}`}>
                                                        {reply.authorName}
                                                    </span>
                                                    <span className="text-[10px] text-muted-foreground/60">
                                                        {new Date(reply.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-foreground/90 leading-relaxed font-serif">
                                                    {reply.content}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })
                )}
            </div>

            {/* Comment Form - Gated */}
            <div className="relative">
                {state?.success ? (
                    <div className="bg-green-50 p-3 rounded-lg border border-green-200 text-green-800 text-xs mb-4 text-center">
                        {state.message}
                    </div>
                ) : state?.message ? (
                    <div className="bg-red-50 p-3 rounded-lg border border-red-200 text-red-800 text-xs mb-4 text-center">
                        {state.message}
                    </div>
                ) : null}

                <div className={`relative transition-all duration-300 ${!isUnlocked ? 'blur-[2px] pointer-events-none select-none' : ''}`}>
                    <form action={formAction} className="bg-background border border-border rounded-xl p-2 flex flex-col gap-2 shadow-sm focus-within:ring-1 focus-within:ring-primary/50">
                        <input type="hidden" name="articleId" value={articleId || ''} />
                        <input type="hidden" name="slug" value={slug || ''} />

                        <div className="px-2 pt-2">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Your Name"
                                required
                                className="w-full bg-transparent border-b border-border/50 px-0 py-1 text-sm focus:border-primary outline-none transition-colors placeholder:text-muted-foreground/50 font-bold"
                            />
                        </div>

                        <textarea
                            id="content"
                            name="content"
                            required
                            placeholder="Share your thoughts..."
                            rows={2}
                            className="w-full bg-transparent border-none px-2 py-2 text-sm focus:ring-0 outline-none resize-none placeholder:text-muted-foreground/50"
                        ></textarea>

                        <div className="flex justify-between items-center px-2 pb-1">
                            {/* Optional: Add emoji button or formating here */}
                            <div className="text-[10px] text-muted-foreground/60">
                                Be kind & respectful
                            </div>
                            <SubmitButton />
                        </div>
                    </form>
                </div>

                {/* Subscribe Gate Overlay */}
                {!isUnlocked && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-background/60 z-10 rounded-xl backdrop-blur-[1px]">
                        <button
                            onClick={handleUnlock}
                            className="bg-accent text-foreground px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-accent/90 shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
                        >
                            <span className="material-symbols-outlined text-sm">lock_open</span>
                            Join Circle to Comment
                        </button>
                    </div>
                )}
            </div>
        </section>
    )
}

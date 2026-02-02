import Link from "next/link";
import ShareButton from "./ShareButton";

interface BlogCardProps {
    slug: string;
    image: string;
    category: string;
    title: string;
    excerpt: string;
    author: string;
    date: string;
    readTime: string;
}

const BlogCard = ({
    slug,
    image,
    category,
    title,
    excerpt,
    author,
    date,
    readTime,
}: BlogCardProps) => {
    return (
        <article className="bg-card group relative h-full flex flex-col border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-lg overflow-hidden">
            {/* Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden bg-beige">
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-colors z-10" />
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-20">
                    <span className="bg-background/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold text-foreground">
                        {category}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-6 flex flex-col flex-grow">
                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-foreground/50 mb-3 font-medium">
                    <span>{date}</span>
                    <span className="w-1 h-1 bg-foreground/20 rounded-full" />
                    <span>{readTime}</span>
                    <div className="ml-auto relative z-30">
                        <ShareButton title={title} slug={slug} />
                    </div>
                </div>

                {/* Title & Excerpt */}
                <h3 className="font-display text-2xl font-bold mb-3 group-hover:text-primary transition-colors leading-tight">
                    <Link href={`/blog/${slug}`} className="focus:outline-none">
                        <span className="absolute inset-0 z-20" aria-hidden="true" />
                        {title}
                    </Link>
                </h3>
                <p className="text-foreground/70 text-sm leading-relaxed mb-6 font-serif flex-grow line-clamp-3">
                    {excerpt}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-border mt-auto">
                    <span className="text-xs uppercase tracking-wider font-bold text-foreground/60 group-hover:text-primary transition-colors flex items-center gap-1">
                        Read Story <span className="material-symbols-outlined text-[16px] transition-transform group-hover:translate-x-1">arrow_forward</span>
                    </span>
                </div>
            </div>
        </article>
    );
};

export default BlogCard;

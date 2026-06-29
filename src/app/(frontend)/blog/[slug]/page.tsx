import Link from "next/link";
import Image from "next/image";
import { fetchArticleBySlug, fetchBlogPage, fetchJoinOurInnerCircle, fetchApprovedComments } from "@/lib/cms";
import { notFound } from "next/navigation";
import { ViewCounter } from "@/components/blog/ViewCounter";
import { Comments } from "@/components/blog/Comments";
import ShareButton from "@/components/ui/ShareButton";

// Simple Rich Text Renderer for Payload Lexical JSON
const RichTextRenderer = ({ content }: { content: any }) => {
    if (!content || !content.root || !content.root.children) return null;

    const renderNode = (node: any, index: number) => {
        switch (node.type) {
            case 'heading':
                const Tag = node.tag as React.ElementType;
                const className = `font-display font-bold mb-4 mt-10 ${node.tag === 'h1' ? 'text-4xl' : node.tag === 'h2' ? 'text-3xl' : 'text-2xl'}`;
                return (
                    <Tag key={index} className={className}>
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </Tag>
                );

            case 'paragraph':
                return (
                    <p key={index} className="mb-6 leading-relaxed font-serif text-lg text-foreground/80">
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </p>
                );

            case 'quote':
                return (
                    <blockquote key={index} className="my-12 py-8 px-10 border-l-4 border-primary bg-primary/5 italic text-2xl font-light text-foreground font-serif rounded-r-xl shadow-sm">
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </blockquote>
                );

            case 'list':
                const ListTag = node.tag === 'ol' ? 'ol' : 'ul';
                const listClass = `mb-6 pl-6 ${node.tag === 'ol' ? 'list-decimal' : 'list-disc'}`;
                return (
                    <ListTag key={index} className={listClass}>
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </ListTag>
                );

            case 'listitem':
                return (
                    <li key={index} className="mb-2">
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </li>
                );

            case 'text':
                let text = node.text;
                if (node.format & 1) text = <strong>{text}</strong>; // Bold
                if (node.format & 2) text = <em>{text}</em>; // Italic
                if (node.format & 8) text = <u>{text}</u>; // Underline
                return <span key={index}>{text}</span>;

            case 'link':
                // If no URL is provided, render as plain text instead of a link
                if (!node.fields?.url) {
                    return (
                        <span key={index}>
                            {node.children?.map((child: any, i: number) => renderNode(child, i))}
                        </span>
                    );
                }
                return (
                    <a key={index} href={node.fields.url} target={node.fields?.newTab ? "_blank" : "_self"} className="text-primary hover:underline underline-offset-2">
                        {node.children?.map((child: any, i: number) => renderNode(child, i))}
                    </a>
                );

            default:
                return <span key={index}>{node.text}</span>;
        }
    };

    return <>{content.root.children.map((node: any, i: number) => renderNode(node, i))}</>;
};

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const [post, blogGlobal, innerCircleData] = await Promise.all([
        fetchArticleBySlug(slug),
        fetchBlogPage(),
        fetchJoinOurInnerCircle(),
    ]);

    if (!post) {
        return notFound();
    }

    const approvedComments = await fetchApprovedComments(post.id);

    return (
        <>
            <ViewCounter articleId={post.id} />
            {/* Spacer for fixed header */}
            <div className="pt-24"></div>

            <main className="max-w-7xl mx-auto px-6 py-10">
                {/* Breadcrumbs */}
                <div className="flex items-center gap-2 mb-8 text-foreground/50 text-sm font-medium">
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                    <span className="text-foreground/20 text-lg leading-none">/</span>
                    <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
                    <span className="text-foreground/20 text-lg leading-none">/</span>
                    <span className="text-foreground/40 truncate max-w-[200px]">{post.category}</span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Main Content */}
                    <article className="lg:col-span-8">
                        {/* Headline */}
                        <div className="mb-10 text-center lg:text-left">
                            <h1 className="font-display text-4xl lg:text-6xl font-bold leading-tight mb-6 tracking-tight">
                                {post.title}
                            </h1>
                            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-foreground/50 text-sm">
                                <span className="flex items-center gap-1">
                                    {post.date}
                                </span>
                                <span className="w-1 h-1 bg-foreground/30 rounded-full"></span>
                                <span className="flex items-center gap-1">
                                    {post.readTime}
                                </span>
                                <span className="w-1 h-1 bg-foreground/30 rounded-full"></span>
                                <span className="flex items-center gap-1">
                                    {post.views || 0} Views
                                </span>
                            </div>
                        </div>

                        {/* Hero Image */}
                        <div className="mb-12 group overflow-hidden bg-beige relative w-full aspect-video rounded-xl shadow-sm">
                            {post.image && (
                                <Image
                                    src={post.image}
                                    alt={post.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 66vw"
                                    priority
                                />
                            )}
                        </div>

                        {/* Article Body */}
                        <div className="prose prose-lg max-w-none text-foreground/80 leading-relaxed">
                            {/* Intro Excerpt as lead paragraph */}
                            <p className="text-xl mb-8 font-light italic text-foreground font-serif leading-relaxed">
                                {post.excerpt}
                            </p>

                            {/* Featured Media Divider (between excerpt and content) */}
                            {post.featuredMedia && (
                                <figure className="my-10 flex flex-col items-center">
                                    <div className="relative w-48 md:w-64 h-auto">
                                        <Image
                                            src={post.featuredMedia}
                                            alt={post.featuredMediaCaption || 'Decorative divider'}
                                            width={256}
                                            height={80}
                                            className="object-contain w-full h-auto"
                                        />
                                    </div>
                                    {post.featuredMediaCaption && (
                                        <figcaption className="mt-4 text-center text-lg md:text-xl italic font-serif text-foreground">
                                            {post.featuredMediaCaption}
                                        </figcaption>
                                    )}
                                </figure>
                            )}

                            {/* Rich Text Content */}
                            <RichTextRenderer content={post.content} />

                            {/* Share Section Footer */}
                            <div className="my-8 flex flex-col items-center justify-center gap-6 border-t border-b border-border/60 py-8">
                                <div className="flex flex-col gap-2 text-center">
                                    <span
                                        className="font-display font-bold text-2xl md:text-xl"
                                        style={{
                                            color: blogGlobal?.shareHeadingColor || 'inherit',
                                            // @ts-ignore
                                            fontFamily: blogGlobal?.shareHeadingFont?.cssVariable ? `var(${blogGlobal.shareHeadingFont.cssVariable})` : undefined
                                        }}
                                    >
                                        {blogGlobal?.shareHeading || 'Share this story'}
                                    </span>
                                    <span
                                        className="text-sm text-foreground/60"
                                        style={{
                                            color: blogGlobal?.shareSubheadingColor || 'inherit',
                                            // @ts-ignore
                                            fontFamily: blogGlobal?.shareSubheadingFont?.cssVariable ? `var(${blogGlobal.shareSubheadingFont.cssVariable})` : undefined
                                        }}
                                    >
                                        {blogGlobal?.shareSubheading || 'Spread the inspiration with your circle.'}
                                    </span>
                                </div>
                                <div className="flex-shrink-0">
                                    <ShareButton
                                        title={post.title}
                                        slug={slug}
                                        variant="inline"
                                        socialPlatforms={blogGlobal?.socialPlatforms || undefined}
                                    />
                                </div>
                            </div>

                            {/* Shop The Look - Dynamic */}
                            {post.relatedProducts && post.relatedProducts.length > 0 && (
                                <section className="my-16 bg-beige p-8 rounded-xl shadow-sm border border-primary/10">
                                    <div className="flex items-center justify-between mb-8">
                                        <h4 className="text-xl font-display font-bold tracking-tight uppercase">Shop The Look</h4>
                                        <span className="text-primary material-symbols-outlined">auto_awesome</span>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {post.relatedProducts.map((product: any, index: number) => (
                                            <div
                                                key={index}
                                                className="bg-card p-4 border border-primary/10 hover:border-primary/30 transition-all duration-300 group rounded-xl card-hover"
                                            >
                                                <div className="aspect-square mb-4 overflow-hidden bg-beige relative rounded-lg">
                                                    {product.image ? (
                                                        <Image
                                                            fill
                                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                            alt={product.name}
                                                            src={product.image.url || product.image}
                                                            sizes="(max-width: 768px) 50vw, 25vw"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground/50">No Image</div>
                                                    )}
                                                </div>
                                                <h5 className="font-bold text-sm mb-1 uppercase tracking-wider">{product.name}</h5>
                                                <p className="text-foreground/50 text-xs mb-3">{product.category}</p>
                                                <div className="flex justify-between items-center">
                                                    <span className="font-display text-primary font-bold">{product.price}</span>
                                                    {product.link && (
                                                        <a href={product.link} target="_blank" className="px-4 py-2 bg-primary text-primary-foreground font-bold text-xs uppercase hover:bg-primary/80 transition-all duration-300 rounded-lg inline-block shadow-sm hover:shadow-md">
                                                            Shop
                                                        </a>
                                                    )}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </div>


                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-4 space-y-8">
                        {/* Comments Section - Moved to Sidebar */}
                        <Comments articleId={post.id} slug={slug} comments={approvedComments} />

                        {/* Newsletter - Join Our Inner Circle */}
                        {innerCircleData?.enabled !== false && (
                            <div 
                                className="bg-secondary text-secondary-foreground p-8 rounded-xl shadow-sm"
                                style={{ backgroundColor: innerCircleData?.backgroundColor || undefined }}
                            >
                                <h3 
                                    className="font-display text-lg font-bold mb-4"
                                    style={{ color: innerCircleData?.titleColor || undefined }}
                                >
                                    {innerCircleData?.title || 'Join Our Inner Circle'}
                                </h3>
                                <p 
                                    className="text-secondary-foreground/80 text-sm mb-6 leading-relaxed"
                                    style={{ color: innerCircleData?.descriptionColor || undefined }}
                                >
                                    {innerCircleData?.description || 'Subscribe to get exclusive updates, offers, and early access.'}
                                </p>
                                <button 
                                    className="w-full bg-accent text-foreground py-3 text-[10px] uppercase tracking-widest font-bold hover:bg-accent/90 transition-all duration-300 rounded-lg shadow-sm hover:shadow-md"
                                    style={{ 
                                        color: innerCircleData?.buttonTextColor || undefined,
                                        backgroundColor: innerCircleData?.buttonBackgroundColor || undefined 
                                    }}
                                >
                                    {innerCircleData?.buttonText || 'Subscribe'}
                                </button>
                            </div>
                        )}
                    </aside>
                </div>
            </main>
        </>
    );
};

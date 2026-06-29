import Link from "next/link";
import BlogCard from "@/components/ui/BlogCard";
import { fetchArticles, fetchBlogPage, fetchJoinOurInnerCircle } from "@/lib/cms";
import { Font } from "@/payload-types";

interface BlogPageProps {
    searchParams: Promise<{ category?: string }>;
}

export default async function Blog({ searchParams }: BlogPageProps) {
    const { category } = await searchParams;
    const selectedCategory = category || "All";

    const [blogPosts, pageData, innerCircleData] = await Promise.all([
        fetchArticles(selectedCategory === "All" ? undefined : selectedCategory),
        fetchBlogPage(),
        fetchJoinOurInnerCircle()
    ]);

    const uniqueCategories = Array.from(new Set(blogPosts.map(p => p.category))).sort();
    const categories = ["All", ...uniqueCategories];

    const getFontUrl = (font: Font | string | null | undefined): string | undefined => {
        if (!font || typeof font === 'string') return undefined;
        return font.url || undefined;
    };

    const titleStyle: React.CSSProperties = {
        color: innerCircleData?.titleColor || undefined,
        fontFamily: getFontUrl(innerCircleData?.titleFont as Font) ? `url(${getFontUrl(innerCircleData?.titleFont as Font)})` : undefined,
    };

    const descriptionStyle: React.CSSProperties = {
        color: innerCircleData?.descriptionColor || undefined,
    };

    const buttonStyle: React.CSSProperties = {
        color: innerCircleData?.buttonTextColor || undefined,
        backgroundColor: innerCircleData?.buttonBackgroundColor || undefined,
    };

    const sectionStyle: React.CSSProperties = {
        backgroundColor: innerCircleData?.backgroundColor || undefined,
    };

    return (
        <>
            <div className="pt-24"></div>

            {pageData?.pageEnabled === false ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-display mb-4">Coming Soon</h1>
                        <p className="text-foreground/60">This page is currently being updated.</p>
                    </div>
                </div>
            ) : (
                <main className="max-w-7xl mx-auto px-6 py-10 pb-20">
                    {pageData && pageData.headerEnabled !== false && (
                        <div className="text-center max-w-2xl mx-auto mb-12">
                            <span className="section-label mb-4 block">{pageData.sectionLabel}</span>
                            <h1 className="heading-display mb-6">
                                {pageData.headingNormal} <span className="text-serif-accent">{pageData.headingAccent}</span>
                            </h1>
                            <p className="body-editorial text-lg">
                                {pageData.description}
                            </p>
                        </div>
                    )}

                    <div className="flex flex-wrap justify-center gap-3 mb-16">
                        {categories.map((cat) => {
                            const isActive = selectedCategory === cat;
                            const href = cat === "All" ? "/blog" : `/blog?category=${encodeURIComponent(cat)}`;
                            return (
                                <Link
                                    key={cat}
                                    href={href}
                                    replace
                                    scroll={false}
                                    className={`text-xs uppercase tracking-widest font-bold px-4 py-2 border transition-all duration-300 rounded-lg ${
                                        isActive
                                            ? "border-primary bg-primary text-primary-foreground shadow-md scale-105"
                                            : "border-border/60 text-foreground/60 hover:text-primary hover:border-primary/40 hover:scale-105"
                                    }`}
                                >
                                    {cat}
                                </Link>
                            );
                        })}
                    </div>

                    {blogPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => (
                                <div key={post.slug} className="h-full">
                                    <BlogCard {...post} />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-20">
                            <span className="material-symbols-outlined text-5xl mb-4 opacity-30 text-foreground/50">search</span>
                            <p className="text-foreground/50 font-serif italic text-lg">No stories found in this category.</p>
                        </div>
                    )}

                    {innerCircleData?.enabled !== false && (
                        <div
                            className="mt-24 p-12 md:p-16 bg-secondary text-secondary-foreground text-center rounded-2xl shadow-lg relative overflow-hidden"
                            style={sectionStyle}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-accent/40 via-accent to-accent/40"></div>
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/[0.02] to-transparent pointer-events-none"></div>
                            <div className="relative z-10 max-w-xl mx-auto">
                                <h2
                                    className="font-display text-3xl md:text-4xl mb-4"
                                    style={titleStyle}
                                >
                                    {innerCircleData?.title || "Join Our Inner Circle"}
                                </h2>
                                <p
                                    className="mb-8 font-serif leading-relaxed opacity-90 text-balance"
                                    style={descriptionStyle}
                                >
                                    {innerCircleData?.description || "Subscribe to get exclusive updates, offers, and early access."}
                                </p>
                                <button
                                    className="bg-accent text-accent-foreground px-8 py-3.5 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-secondary transition-all duration-300 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0"
                                    style={buttonStyle}
                                >
                                    {innerCircleData?.buttonText || "Subscribe"}
                                </button>
                            </div>
                        </div>
                    )}
                </main>
            )}
        </>
    );
}

'use client';

import { useState, useEffect } from "react";
import BlogCard from "@/components/ui/BlogCard";
import { fetchArticles, fetchBlogPage, fetchJoinOurInnerCircle, BlogPost } from "@/lib/cms.client";
import { BlogPage, JoinOurInnerCircle, Font } from "@/payload-types";

const Blog = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [pageData, setPageData] = useState<BlogPage | null>(null);
    const [innerCircleData, setInnerCircleData] = useState<JoinOurInnerCircle | null>(null);
    const [loading, setLoading] = useState(true);

    const [categories, setCategories] = useState(["All"]);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [posts, page, innerCircle] = await Promise.all([
                fetchArticles(selectedCategory === "All" ? undefined : selectedCategory),
                fetchBlogPage(),
                fetchJoinOurInnerCircle()
            ]);
            setBlogPosts(posts);

            // Only update categories list if we are viewing "All", so we see available tags
            if (selectedCategory === "All") {
                const uniqueCategories = Array.from(new Set(posts.map(p => p.category))).sort();
                // Ensure "All" is always first
                setCategories(["All", ...uniqueCategories]);
            }

            setPageData(page);
            setInnerCircleData(innerCircle);
            setLoading(false);
        };

        loadData();
    }, [selectedCategory]);

    // Helper to get font URL from font relationship
    const getFontUrl = (font: Font | string | null | undefined): string | undefined => {
        if (!font || typeof font === 'string') return undefined;
        return font.url || undefined;
    };

    // Build inline styles for inner circle section
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
            {/* Spacer for fixed header */}
            <div className="pt-24"></div>

            {/* If page is disabled, show coming soon */}
            {pageData?.pageEnabled === false ? (
                <div className="min-h-[60vh] flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="text-4xl font-display mb-4">Coming Soon</h1>
                        <p className="text-foreground/60">This page is currently being updated.</p>
                    </div>
                </div>
            ) : (
                <main className="max-w-7xl mx-auto px-6 py-10 pb-20">
                    {/* Header Section - only show if page data exists and is enabled */}
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

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-4 mb-16">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`text-xs uppercase tracking-widest font-bold px-4 py-2 border transition-all duration-300 ${selectedCategory === category
                                    ? "border-primary bg-primary text-primary-foreground"
                                    : "border-transparent text-foreground/60 hover:text-primary hover:border-primary/20"
                                    }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="text-center py-20">
                            <p className="text-foreground/50 font-serif italic text-lg">Loading stories...</p>
                        </div>
                    )}

                    {/* Blog Grid */}
                    {!loading && blogPosts.length > 0 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {blogPosts.map((post) => (
                                <div key={post.slug} className="h-full">
                                    <BlogCard {...post} />
                                </div>
                            ))}
                        </div>
                    )}

                    {!loading && blogPosts.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-foreground/50 font-serif italic text-lg">No stories found in this category.</p>
                        </div>
                    )}

                    {/* Newsletter Section - Join Our Inner Circle */}
                    {innerCircleData?.enabled !== false && (
                        <div 
                            className="mt-24 p-12 bg-secondary text-secondary-foreground text-center rounded-sm relative overflow-hidden"
                            style={sectionStyle}
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-accent/30"></div>
                            <div className="relative z-10 max-w-xl mx-auto">
                                <h2 
                                    className="font-display text-3xl mb-4"
                                    style={titleStyle}
                                >
                                    {innerCircleData?.title || "Join Our Inner Circle"}
                                </h2>
                                <p 
                                    className="mb-8 font-serif leading-relaxed opacity-90"
                                    style={descriptionStyle}
                                >
                                    {innerCircleData?.description || "Subscribe to get exclusive updates, offers, and early access."}
                                </p>
                                <button 
                                    className="bg-accent text-accent-foreground px-8 py-3 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-secondary transition-colors"
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
};

export default Blog;

'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { WatchPage, Media, Font } from '@/payload-types';

interface WatchClientProps {
    data: WatchPage;
}

const getMediaUrl = (media: Media | string | null | undefined): string => {
    if (!media) return '';
    if (typeof media === 'string') return media;
    return media.url || '';
};

const getFontFamily = (font: Font | string | null | undefined): string | undefined => {
    if (!font || typeof font === 'string') return undefined;
    return font.filename?.replace(/\.[^/.]+$/, '');
};

const formatViews = (views: number): string => {
    if (views >= 1000000) {
        return `${(views / 1000000).toFixed(1)}M views`;
    } else if (views >= 1000) {
        return `${(views / 1000).toFixed(1)}K views`;
    }
    return `${views} views`;
};

export default function WatchClient({ data }: WatchClientProps) {
    const [activeCategory, setActiveCategory] = useState('all');
    const [playingVideo, setPlayingVideo] = useState<string | null>(null);
    const [featuredPlaying, setFeaturedPlaying] = useState(false);

    // Theme colors
    const pageBackgroundColor = data.pageBackgroundColor || undefined;
    const primaryAccentColor = data.primaryAccentColor || undefined;
    const textColor = data.textColor || undefined;
    const mutedTextColor = data.mutedTextColor || undefined;
    const cardBackgroundColor = data.cardBackgroundColor || undefined;
    const borderColor = data.borderColor || undefined;

    // Filter videos by category
    const filteredVideos = useMemo(() => {
        if (!data.videos) return [];
        if (activeCategory === 'all') return data.videos;
        return data.videos.filter(video => video.category === activeCategory);
    }, [data.videos, activeCategory]);

    // Get YouTube embed URL from regular URL
    const getYouTubeEmbedUrl = (url: string | null | undefined): string | null => {
        if (!url) return null;
        const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/);
        if (match && match[1]) {
            return `https://www.youtube.com/embed/${match[1]}?autoplay=1`;
        }
        return null;
    };

    // Get Vimeo embed URL from regular URL
    const getVimeoEmbedUrl = (url: string | null | undefined): string | null => {
        if (!url) return null;
        const match = url.match(/vimeo\.com\/(\d+)/);
        if (match && match[1]) {
            return `https://player.vimeo.com/video/${match[1]}?autoplay=1`;
        }
        return null;
    };

    const getEmbedUrl = (url: string | null | undefined): string | null => {
        const youtubeEmbed = getYouTubeEmbedUrl(url);
        if (youtubeEmbed) return youtubeEmbed;
        return getVimeoEmbedUrl(url);
    };

    if (!data.pageEnabled) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
                    <p className="text-foreground/60">Our video content is being curated. Please check back later.</p>
                </div>
            </div>
        );
    }

    const maxWidthClass = `max-w-${data.maxContentWidth || '7xl'}`;
    const gridCols = data.galleryColumns === '3' ? 'md:grid-cols-3' : data.galleryColumns === '4' ? 'md:grid-cols-4' : 'md:grid-cols-2';
    const gridGap = data.galleryGap || 'gap-6';

    return (
        <div className="min-h-screen" style={{ backgroundColor: pageBackgroundColor }}>
            {/* Spacer for fixed header */}
            <div className="pt-24"></div>

            <main className={`${maxWidthClass} mx-auto w-full px-6 py-10`}>
                {/* Hero / Headline */}
                {data.heroEnabled && (
                    <div className="mb-10 text-center">
                        <h1 
                            className="tracking-[0.15em] text-4xl md:text-5xl font-display font-bold leading-tight uppercase mb-2"
                            style={{ 
                                color: data.heroHeadingColor || textColor,
                                fontFamily: getFontFamily(data.heroHeadingFont)
                            }}
                        >
                            {data.heroHeading || 'Cinematic Vlogs'}
                        </h1>
                        {data.heroSubheading && (
                            <p 
                                className="text-lg font-light italic font-serif"
                                style={{ 
                                    color: data.heroSubheadingColor || mutedTextColor,
                                    fontFamily: getFontFamily(data.heroSubheadingFont)
                                }}
                            >
                                {data.heroSubheading}
                            </p>
                        )}
                    </div>
                )}

                {/* Featured Video */}
                {data.featuredVideoEnabled && (
                    <div className="mb-16">
                        <div 
                            className={`${data.playerBorderEnabled ? 'p-[2px] bg-gradient-to-br from-primary via-primary/50 to-primary/10' : ''} shadow-xl rounded-xl overflow-hidden`}
                            style={data.playerBorderEnabled && data.playerBorderColor ? {
                                background: `linear-gradient(to bottom right, ${data.playerBorderColor}, ${data.playerBorderColor}50, ${data.playerBorderColor}10)`
                            } : undefined}
                        >
                            <div
                                className="relative flex items-center justify-center bg-foreground bg-cover bg-center aspect-video overflow-hidden group"
                                style={{
                                    backgroundImage: data.featuredVideoThumbnail 
                                        ? `url("${getMediaUrl(data.featuredVideoThumbnail)}")` 
                                        : `url("https://via.assets.so/img.jpg?w=1920&h=1080&tc=white&bg=333333&t=Featured+Video")`,
                                }}
                            >
                                {featuredPlaying && data.featuredVideoUrl ? (
                                    <iframe
                                        src={getEmbedUrl(data.featuredVideoUrl) || ''}
                                        className="absolute inset-0 w-full h-full z-20"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    />
                                ) : (
                                    <>
                                        {/* Overlay Gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

                                        {/* Play Button */}
                                        <button 
                                            onClick={() => setFeaturedPlaying(true)}
                                            className="play-button relative z-10 hover:scale-110 active:scale-95 transition-transform duration-300 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl"
                                            style={{ backgroundColor: data.playButtonColor || primaryAccentColor }}
                                        >
                                            <span className="material-symbols-outlined text-5xl text-white translate-x-1">play_arrow</span>
                                        </button>

                                        {/* Video Controls Bar (Decorative) */}
                                        <div className="absolute inset-x-0 bottom-0 px-6 py-6 z-10">
                                            <div className="flex h-1.5 items-center justify-center mb-4 cursor-pointer">
                                                <div className="h-full flex-1 rounded-full" style={{ backgroundColor: primaryAccentColor }}></div>
                                                <div className="relative">
                                                    <div 
                                                        className="absolute -left-2 -top-1.5 w-4 h-4 rounded-full border-4 border-foreground shadow-xl"
                                                        style={{ backgroundColor: primaryAccentColor }}
                                                    ></div>
                                                </div>
                                                <div className="h-full flex-[4] bg-card/20 rounded-full"></div>
                                            </div>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-card">
                                                    <span className="material-symbols-outlined text-2xl cursor-pointer hover:opacity-80 transition-opacity">pause</span>
                                                    <span className="material-symbols-outlined text-2xl cursor-pointer hover:opacity-80 transition-opacity">volume_up</span>
                                                    <p className="text-xs font-medium tracking-widest uppercase">
                                                        00:00 / {data.featuredVideoDuration || '15:45'}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-4 text-card">
                                                    <span className="material-symbols-outlined text-2xl cursor-pointer hover:opacity-80 transition-opacity">settings</span>
                                                    <span className="material-symbols-outlined text-2xl cursor-pointer hover:opacity-80 transition-opacity">fullscreen</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Featured Title Overlay */}
                                        <div className="absolute top-8 left-8 text-left max-w-lg text-card z-10">
                                            {data.featuredVideoBadge && (
                                                <span 
                                                    className="px-3 py-1 text-[10px] font-bold tracking-widest uppercase mb-3 inline-block rounded-md shadow-lg"
                                                    style={{ 
                                                        backgroundColor: data.featuredVideoBadgeColor || primaryAccentColor,
                                                        color: data.featuredVideoBadgeTextColor || '#ffffff'
                                                    }}
                                                >
                                                    {data.featuredVideoBadge}
                                                </span>
                                            )}
                                            <h2 
                                                className="text-3xl font-display font-bold leading-tight"
                                                style={{ 
                                                    color: data.featuredVideoTitleColor || '#ffffff',
                                                    fontFamily: getFontFamily(data.featuredVideoTitleFont)
                                                }}
                                            >
                                                {data.featuredVideoTitle || 'THE AUTUMN EDIT'}
                                            </h2>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                <div className={`grid grid-cols-1 ${data.showSidebar ? 'lg:grid-cols-12' : ''} gap-10`}>
                    {/* Sidebar - Left Position */}
                    {data.showSidebar && data.sidebarPosition === 'left' && (
                        <Sidebar data={data} primaryAccentColor={primaryAccentColor} textColor={textColor} mutedTextColor={mutedTextColor} cardBackgroundColor={cardBackgroundColor} borderColor={borderColor} />
                    )}

                    {/* Main Gallery Area */}
                    <div className={data.showSidebar ? 'lg:col-span-8' : ''}>
                        {/* Categories */}
                        {data.categoriesEnabled && data.categories && data.categories.length > 0 && (
                            <div className="flex gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                                {data.categories.map((category) => (
                                    <button
                                        key={category.slug || category.name}
                                        onClick={() => setActiveCategory(category.slug || category.name?.toLowerCase().replace(/\s+/g, '-') || 'all')}
                                        className={`whitespace-nowrap px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                                            activeCategory === (category.slug || category.name?.toLowerCase().replace(/\s+/g, '-'))
                                                ? 'shadow-lg'
                                                : 'hover:border-primary/30 hover:shadow-md'
                                        }`}
                                        style={
                                            activeCategory === (category.slug || category.name?.toLowerCase().replace(/\s+/g, '-'))
                                                ? { 
                                                    backgroundColor: data.categoryPillActiveColor || primaryAccentColor,
                                                    color: data.categoryPillActiveTextColor || '#ffffff'
                                                }
                                                : { 
                                                    backgroundColor: data.categoryPillInactiveColor || 'transparent',
                                                    color: data.categoryPillInactiveTextColor || textColor,
                                                    border: `1px solid ${borderColor || '#868753'}`
                                                }
                                        }
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Gallery Section Title */}
                        {data.galleryEnabled && (
                            <>
                                <h2 
                                    className="text-2xl font-display font-bold tracking-tight uppercase border-l-[3px] rounded-r-sm pl-4 mb-8"
                                    style={{ 
                                        color: data.gallerySectionTitleColor || textColor,
                                        fontFamily: getFontFamily(data.gallerySectionTitleFont),
                                        borderColor: data.galleryBorderAccentColor || primaryAccentColor
                                    }}
                                >
                                    {data.gallerySectionTitle || 'Latest Vlogs'}
                                </h2>
                                
                                {/* Video Grid */}
                                <div className={`grid grid-cols-1 ${gridCols} ${gridGap}`}>
                                    {filteredVideos.map((video, index) => (
                                        <div key={video.slug || index} className="group cursor-pointer">
                                            <div className="relative aspect-video bg-black/5 overflow-hidden rounded-xl shadow-sm transition-all duration-300 group-hover:shadow-xl group-hover:-translate-y-0.5">
                                                {playingVideo === (video.slug || String(index)) && video.videoUrl ? (
                                                    <iframe
                                                        src={getEmbedUrl(video.videoUrl) || ''}
                                                        className="absolute inset-0 w-full h-full"
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen
                                                    />
                                                ) : (
                                                    <>
                                                        {video.thumbnail && (
                                                            <Image
                                                                src={getMediaUrl(video.thumbnail)}
                                                                alt={video.title || ''}
                                                                fill
                                                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                            />
                                                        )}
                                                        <div 
                                                            className="video-overlay absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                            onClick={() => setPlayingVideo(video.slug || String(index))}
                                                        >
                                                        <div 
                                                            className="w-14 h-14 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm transition-transform duration-300 group-hover:scale-110"
                                                            style={{ backgroundColor: data.videoCardPlayButtonColor || primaryAccentColor }}
                                                        >
                                                            <span className="material-symbols-outlined text-white text-3xl">play_arrow</span>
                                                        </div>
                                                    </div>
                                                    {video.duration && (
                                                        <div 
                                                            className="badge-premium absolute bottom-2 right-2 shadow-md"
                                                                style={{ 
                                                                    backgroundColor: data.videoCardDurationBgColor || 'rgba(0,0,0,0.7)',
                                                                    color: data.videoCardDurationTextColor || '#ffffff'
                                                                }}
                                                            >
                                                                {video.duration}
                                                            </div>
                                                        )}
                                                        {video.showNewBadge && (
                                                            <div 
                                                                className="badge-premium absolute top-2 left-2 shadow-md"
                                                                style={{ 
                                                                    backgroundColor: primaryAccentColor,
                                                                    color: '#ffffff'
                                                                }}
                                                            >
                                                                New
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                            <span 
                                                className="text-[10px] uppercase tracking-widest font-bold mt-3 block"
                                                style={{ color: data.videoCardCategoryColor || primaryAccentColor }}
                                            >
                                                {data.categories?.find(c => c.slug === video.category)?.name || video.category}
                                            </span>
                                            <h3 
                                                className="font-display text-lg font-bold group-hover:opacity-80 transition-opacity mt-1"
                                                style={{ 
                                                    color: data.videoCardTitleColor || textColor,
                                                    fontFamily: getFontFamily(data.videoCardTitleFont)
                                                }}
                                            >
                                                {video.title}
                                            </h3>
                                            <p 
                                                className="text-sm mt-0.5"
                                                style={{ color: data.videoCardViewsColor || mutedTextColor }}
                                            >
                                                {formatViews(video.views || 0)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                {filteredVideos.length === 0 && (
                                    <div className="text-center py-12">
                                        <p style={{ color: mutedTextColor }}>No videos found in this category.</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Sidebar - Right Position */}
                    {data.showSidebar && data.sidebarPosition !== 'left' && (
                        <Sidebar data={data} primaryAccentColor={primaryAccentColor} textColor={textColor} mutedTextColor={mutedTextColor} cardBackgroundColor={cardBackgroundColor} borderColor={borderColor} />
                    )}
                </div>

                {/* Playlists Section */}
                {data.playlistsEnabled && data.playlists && data.playlists.length > 0 && (
                    <section className="mt-16">
                        <h2 
                            className="text-2xl font-display font-bold tracking-tight uppercase border-l-[3px] rounded-r-sm pl-4 mb-8"
                            style={{ 
                                color: data.playlistsSectionHeadingColor || textColor,
                                fontFamily: getFontFamily(data.playlistsSectionHeadingFont),
                                borderColor: primaryAccentColor
                            }}
                        >
                            {data.playlistsSectionHeading || 'Video Playlists'}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {data.playlists.map((playlist, index) => (
                                <a 
                                    key={index}
                                    href={playlist.youtubePlaylistUrl || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group block p-6 rounded-xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                                    style={{ 
                                        backgroundColor: data.playlistCardBgColor || cardBackgroundColor,
                                        borderColor: data.playlistCardBorderColor || borderColor
                                    }}
                                >
                                    {playlist.coverImage && (
                                        <div className="relative aspect-video mb-4 overflow-hidden rounded-lg">
                                            <Image
                                                src={getMediaUrl(playlist.coverImage)}
                                                alt={playlist.name || ''}
                                                fill
                                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                                            />
                                            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                                                <span className="material-symbols-outlined text-white text-4xl">playlist_play</span>
                                            </div>
                                        </div>
                                    )}
                                    <h3 className="font-display font-bold text-lg mb-1" style={{ color: textColor }}>
                                        {playlist.name}
                                    </h3>
                                    {playlist.description && (
                                        <p className="text-sm mb-2" style={{ color: mutedTextColor }}>
                                            {playlist.description}
                                        </p>
                                    )}
                                    {playlist.videoCount && (
                                        <p className="text-xs font-medium" style={{ color: primaryAccentColor }}>
                                            {playlist.videoCount} videos
                                        </p>
                                    )}
                                </a>
                            ))}
                        </div>
                    </section>
                )}

                {/* Social Follow */}
                {data.socialFollowEnabled && (
                    <div 
                        className="mt-20 border-t pt-10 pb-10 text-center"
                        style={{ borderColor: data.socialSectionBorderColor || borderColor }}
                    >
                        <p 
                            className="text-[10px] font-bold tracking-[0.3em] uppercase mb-4"
                            style={{ 
                                color: data.socialFollowHeadingColor || primaryAccentColor,
                                fontFamily: getFontFamily(data.socialFollowHeadingFont)
                            }}
                        >
                            {data.socialFollowHeading || 'Follow us on Socials'}
                        </p>
                        <div className="flex justify-center gap-8">
                            {data.socialLinks?.map((social, index) => (
                                <a 
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="transition-all duration-300 text-3xl hover:scale-110"
                                    style={{ color: data.socialIconColor || mutedTextColor }}
                                    onMouseEnter={(e) => {
                                        if (data.socialIconHoverColor) {
                                            e.currentTarget.style.color = data.socialIconHoverColor;
                                        }
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.color = data.socialIconColor || mutedTextColor || '';
                                    }}
                                >
                                    {social.icon ? (
                                        <Image 
                                            src={getMediaUrl(social.icon)} 
                                            alt={social.platform || ''} 
                                            width={30} 
                                            height={30}
                                        />
                                    ) : (
                                        <span className="material-symbols-outlined">
                                            {social.materialIcon || 'link'}
                                        </span>
                                    )}
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}

// Sidebar Component
function Sidebar({ 
    data, 
    primaryAccentColor, 
    textColor, 
    mutedTextColor, 
    cardBackgroundColor, 
    borderColor 
}: { 
    data: WatchPage; 
    primaryAccentColor?: string;
    textColor?: string;
    mutedTextColor?: string;
    cardBackgroundColor?: string;
    borderColor?: string;
}) {
    return (
        <aside className="lg:col-span-4 space-y-8">
            {/* Subscribe Card */}
            {data.subscribeCardEnabled && (
                <div 
                    className="p-8 rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
                    style={{ backgroundColor: data.subscribeCardBackgroundColor || cardBackgroundColor }}
                >
                    <h3 
                        className="font-display text-xl font-bold mb-4"
                        style={{ 
                            color: data.subscribeCardHeadingColor || textColor,
                            fontFamily: getFontFamily(data.subscribeCardHeadingFont)
                        }}
                    >
                        {data.subscribeCardHeading || 'Never Miss a Video'}
                    </h3>
                    <p 
                        className="text-sm mb-6 leading-relaxed"
                        style={{ color: data.subscribeCardDescriptionColor || mutedTextColor }}
                    >
                        {data.subscribeCardDescription}
                    </p>
                    {data.showYouTubeStats && (
                        <div className="flex gap-4 mb-4 text-sm">
                            {data.youtubeSubscriberCount && (
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-lg" style={{ color: primaryAccentColor }}>group</span>
                                    <span style={{ color: textColor }}>{data.youtubeSubscriberCount}</span>
                                </div>
                            )}
                            {data.youtubeTotalViews && (
                                <div className="flex items-center gap-1">
                                    <span className="material-symbols-outlined text-lg" style={{ color: primaryAccentColor }}>visibility</span>
                                    <span style={{ color: textColor }}>{data.youtubeTotalViews}</span>
                                </div>
                            )}
                        </div>
                    )}
                    <a
                        href={data.subscribeButtonUrl || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full block text-center py-3 rounded-lg text-[10px] uppercase tracking-widest font-bold hover:opacity-90 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 shadow-sm hover:shadow-md"
                        style={{ 
                            backgroundColor: data.subscribeButtonBgColor || primaryAccentColor,
                            color: data.subscribeButtonTextColor || '#ffffff'
                        }}
                    >
                        {data.subscribeButtonText || 'Subscribe'}
                    </a>
                </div>
            )}

            {/* Must Watch Section */}
            {data.mustWatchEnabled && data.mustWatchItems && data.mustWatchItems.length > 0 && (
                <div 
                    className="p-6 border rounded-xl shadow-sm transition-all duration-200 hover:shadow-md"
                    style={{ 
                        backgroundColor: data.mustWatchBackgroundColor || cardBackgroundColor,
                        borderColor: data.mustWatchBorderColor || borderColor
                    }}
                >
                    <h3 
                        className="text-lg font-display font-bold uppercase tracking-wider border-b pb-4 mb-4"
                        style={{ 
                            color: data.mustWatchHeadingColor || textColor,
                            fontFamily: getFontFamily(data.mustWatchHeadingFont),
                            borderColor: borderColor
                        }}
                    >
                        {data.mustWatchHeading || 'Must Watch'}
                    </h3>
                    <div className="space-y-6">
                        {data.mustWatchItems.map((item, index) => (
                            <a 
                                key={index}
                                href={item.videoUrl || '#'}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-4 group cursor-pointer"
                            >
                                <div className="w-16 h-16 shrink-0 overflow-hidden bg-gray-200 rounded-lg shadow-sm">
                                    {item.image && (
                                        <Image
                                            src={getMediaUrl(item.image)}
                                            alt={item.title || ''}
                                            width={64}
                                            height={64}
                                            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                                        />
                                    )}
                                </div>
                                <div>
                                    <h4 
                                        className="text-xs font-bold uppercase group-hover:opacity-80 transition-all duration-200"
                                        style={{ color: data.mustWatchTitleColor || textColor }}
                                    >
                                        {item.title}
                                    </h4>
                                    {item.subtitle && (
                                        <p 
                                            className="text-[10px] mt-1 uppercase tracking-tighter"
                                            style={{ color: data.mustWatchSubtitleColor || mutedTextColor }}
                                        >
                                            {item.subtitle}
                                        </p>
                                    )}
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </aside>
    );
}

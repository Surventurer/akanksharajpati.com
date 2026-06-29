'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Header as HeaderType, Media, Font } from "@/payload-types";

// Default fallback logo
const defaultLogo = "/asset/logo.png";

interface HeaderProps {
  data?: HeaderType | null;
}

const Header = ({ data }: HeaderProps) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
    }, []);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Helper to load custom fonts
  useEffect(() => {
    const fontsToLoad: Font[] = [];
    
    if (data?.ownerFont && typeof data.ownerFont !== 'string') {
      fontsToLoad.push(data.ownerFont);
    }
    
    data?.navItems?.forEach(item => {
      if (item.font && typeof item.font !== 'string') {
        fontsToLoad.push(item.font as Font);
      }
    });

    data?.socialLinks?.forEach(item => {
      if (item.font && typeof item.font !== 'string') {
        fontsToLoad.push(item.font as Font);
      }
    });

    data?.navIcons?.forEach(item => {
      if (item.font && typeof item.font !== 'string') {
        fontsToLoad.push(item.font as Font);
      }
    });

    // Load fonts dynamically
    fontsToLoad.forEach(font => {
      const fontName = font.name;
      const fontUrl = font.url;
      
      if (fontUrl && fontName && !loadedFonts.has(fontName)) {
        const style = document.createElement('style');
        style.textContent = `
          @font-face {
            font-family: '${fontName}';
            src: url('${fontUrl}');
            font-display: swap;
          }
        `;
        document.head.appendChild(style);
        setLoadedFonts(prev => new Set([...prev, fontName]));
      }
    });
  }, [data, loadedFonts]);

  // Parse Logo
  const logoUrl = data?.logo && typeof data.logo !== 'string' && (data.logo as Media).url
    ? (data.logo as Media).url
    : defaultLogo;

  // Helper for font family - use font.name as the font-family
  const getFontFamily = (font: Font | string | null | undefined): string => {
    if (!font) return 'inherit';
    if (typeof font === 'string') return 'inherit';
    return font.filename || 'inherit';
  };

  // Helper to get media URL
  const getMediaUrl = (media: Media | string | null | undefined): string | null => {
    if (!media) return null;
    if (typeof media === 'string') return null;
    return media.url || null;
  };

  // Parse Nav Items - only use CMS data if it exists
  const navLinks = (data?.navItems && data.navItems.length > 0)
    ? data.navItems.map(item => ({
      href: item.link || '#',
      label: item.label,
      newTab: item.newTab || false,
      font: item.font as Font,
      color: item.color,
    }))
    : [];

  // Parse social links
  const socialLinks = data?.socialLinks || [];

  // Parse nav icons (search, shop, etc)
  const navIcons = data?.navIcons || [];

  // If no data from CMS, don't render header
  if (!data) {
    return null;
  }

  return (
    <>
      {/* Top Header Bar - Minimal */}
      <header 
        className="fixed w-full z-50 transition-all duration-500 ease-out will-change-transform"
        style={{
          backgroundColor: scrolled 
            ? `${data.headerBackgroundColor || '#F2EBD0'}e6` 
            : (data.headerBackgroundColor || '#F2EBD0'),
          backdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'blur(12px)',
          WebkitBackdropFilter: scrolled ? 'blur(24px) saturate(1.2)' : 'blur(12px)',
          borderBottom: `1px solid ${data.headerTextColor ? `${data.headerTextColor}12` : 'rgba(74,75,52,0.08)'}`,
          boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.02)' : 'none',
          color: data.headerTextColor || '#4a4b34'
        }}
      >
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-2 md:py-3 flex justify-between items-center h-20 md:h-32">
          {/* Hamburger Menu Button - Left */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="group p-2.5 hover:bg-black/5 active:bg-black/10 rounded-xl transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ color: data.headerTextColor || '#4a4b34' }}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span className={`absolute block h-px w-5 bg-current transition-all duration-300 ease-out ${menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'}`} />
              <span className={`absolute block h-px w-5 bg-current transition-all duration-300 ease-out ${menuOpen ? 'opacity-0' : 'opacity-100'}`} />
              <span className={`absolute block h-px w-5 bg-current transition-all duration-300 ease-out ${menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'}`} />
            </div>
          </button>

          {/* Center Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
              <div className="relative h-16 w-32 md:h-24 md:w-48">
                <Image
                  src={logoUrl!}
                  alt="Logo"
                  fill
                  sizes="(max-width: 768px) 128px, 192px"
                  className="object-contain"
                  priority
                />
              </div>
          </Link>

          {/* Right Side Icons */}
          <div className="flex items-center gap-1 md:gap-2">
            {navIcons && navIcons.map((iconItem, i) => {
              if (iconItem.enabled === false) return null;

              const iconUrl = getMediaUrl(iconItem.icon as Media);
              
              const shouldShowIcon = iconItem.showIcon === true;
              const showIconOnDevice = shouldShowIcon && (isMobile ? iconItem.showIconOnMobile !== false : iconItem.showIconOnDesktop !== false);
              
              const shouldShowLabel = iconItem.showLabel === true;
              const showLabelOnDevice = shouldShowLabel && (isMobile ? iconItem.showLabelOnMobile !== false : iconItem.showLabelOnDesktop !== false);
              
              const iconContent = showIconOnDevice ? (
                iconUrl ? (
                  <div className="relative w-5 h-5">
                    <Image
                      src={iconUrl}
                      alt={iconItem.label || 'Icon'}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : iconItem.type === 'search' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                  </svg>
                ) : iconItem.type === 'link' ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1" />
                    <circle cx="20" cy="21" r="1" />
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                  </svg>
                ) : null
              ) : null;

              const labelContent = showLabelOnDevice && iconItem.label ? (
                <span 
                  className="text-[10px] md:text-xs uppercase tracking-widest font-bold"
                  style={{
                    fontFamily: getFontFamily(iconItem.font as Font),
                    color: iconItem.color || data.headerTextColor || '#4a4b34'
                  }}
                >
                  {iconItem.label}
                </span>
              ) : null;

              const displayContent = iconContent || labelContent;

              if (!displayContent) return null;
              
              if (iconItem.type === 'search') {
                return (
                  <button
                      key={i}
                      className="hover:bg-black/5 active:bg-black/10 active:scale-95 transition-all duration-200 rounded-xl p-2.5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      aria-label={iconItem.label || 'Search'}
                      style={{ color: data.headerTextColor || '#4a4b34' }}
                    >
                      {displayContent}
                    </button>
                );
              }

              if (iconItem.type === 'link' && iconItem.link) {
                return (
                    <Link
                      key={i}
                      href={iconItem.link}
                      target={iconItem.newTab ? "_blank" : "_self"}
                      className="hover:bg-black/5 active:bg-black/10 active:scale-95 transition-all duration-200 rounded-xl p-2.5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      style={{ color: data.headerTextColor || '#4a4b34' }}
                    >
                      {displayContent}
                    </Link>
                );
              }

              return null;
            })}
          </div>
        </div>
      </header>

      {/* Full-Screen Overlay Menu */}
      {menuOpen && (
        <div 
          className="fixed inset-0 z-40 overflow-y-auto animate-fade-in"
          style={{ 
            backgroundColor: data.headerBackgroundColor || '#F2EBD0',
            color: data.headerTextColor || '#4a4b34'
          }}
        >
          <div className="min-h-screen flex flex-col">
            {/* Top Bar in Overlay */}
            <div className="relative px-4 md:px-6 py-2 md:py-3 flex justify-between items-center h-20 md:h-24" style={{ borderBottom: `1px solid ${data.headerTextColor}12` }}>
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:opacity-70 transition-all duration-300 group"
                style={{ color: data.headerTextColor || '#4a4b34' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform duration-300 group-hover:-translate-x-0.5">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                CLOSE
              </button>

              {/* Center Logo */}
              <Link href="/" onClick={() => setMenuOpen(false)} className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98]">
                <div className="relative h-16 w-32">
                  <Image
                    src={logoUrl!}
                    alt="Logo"
                    fill
                    sizes="128px"
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* Right Icons */}
              <div className="flex items-center gap-6">
                {navIcons && navIcons.map((iconItem, i) => {
                  if (iconItem.enabled === false) return null;

                  const iconUrl = getMediaUrl(iconItem.icon as Media);
                  
                  const shouldShowIcon = iconItem.showIcon === true;
                  const showIconOnDevice = shouldShowIcon && (isMobile ? iconItem.showIconOnMobile !== false : iconItem.showIconOnDesktop !== false);
                  
                  const shouldShowLabel = iconItem.showLabel === true;
                  const showLabelOnDevice = shouldShowLabel && (isMobile ? iconItem.showLabelOnMobile !== false : iconItem.showLabelOnDesktop !== false);
                  
                  const iconContent = showIconOnDevice ? (
                    iconUrl ? (
                      <div className="relative w-6 h-6">
                        <Image
                          src={iconUrl}
                          alt={iconItem.label || 'Icon'}
                          fill
                          className="object-contain"
                        />
                      </div>
                    ) : iconItem.type === 'search' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                    ) : iconItem.type === 'link' ? (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="9" cy="21" r="1" />
                        <circle cx="20" cy="21" r="1" />
                        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                      </svg>
                    ) : null
                  ) : null;

                  const labelContent = showLabelOnDevice && iconItem.label ? (
                    <span 
                      className="text-xs uppercase tracking-widest font-bold"
                      style={{
                        fontFamily: getFontFamily(iconItem.font as Font),
                        color: iconItem.color || data.headerTextColor || '#4a4b34'
                      }}
                    >
                      {iconItem.label}
                    </span>
                  ) : null;

                  const displayContent = iconContent || labelContent;

                  if (!displayContent) return null;
                  
                  if (iconItem.type === 'search') {
                    return (
                      <button
                        key={i}
                        className="hover:bg-black/5 active:bg-black/10 active:scale-95 transition-all duration-200 rounded-xl p-2.5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label={iconItem.label || 'Search'}
                        style={{ color: data.headerTextColor || '#4a4b34' }}
                      >
                        {displayContent}
                      </button>
                    );
                  }

                  if (iconItem.type === 'link' && iconItem.link) {
                    return (
                      <Link
                        key={i}
                        href={iconItem.link}
                        target={iconItem.newTab ? "_blank" : "_self"}
                        className="hover:bg-black/5 active:bg-black/10 active:scale-95 transition-all duration-200 rounded-xl p-2.5 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        style={{ color: data.headerTextColor || '#4a4b34' }}
                      >
                        {displayContent}
                      </Link>
                    );
                  }

                  return null;
                })}
              </div>
            </div>

            {/* Navigation Menu - Centered */}
            <div className="flex-1 flex flex-col items-center justify-center min-h-0 py-4 md:py-12 px-4 md:px-6">
              <nav className="flex flex-col items-center gap-4 md:gap-8">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.label + link.href}
                    href={link.href}
                    target={link.newTab ? "_blank" : "_self"}
                    onClick={() => setMenuOpen(false)}
                    className="group text-xl md:text-2xl lg:text-3xl uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold transition-all duration-500 relative inline-block"
                    style={{
                      fontFamily: getFontFamily(link.font),
                      color: link.color || data.headerTextColor || '#4a4b34',
                      opacity: pathname === link.href ? 1 : 0.6,
                      animationDelay: `${i * 80}ms`,
                    }}
                  >
                    <span className="relative inline-block transition-all duration-500 group-hover:tracking-[0.45em]">
                      {link.label}
                    </span>
                    <span className="absolute -bottom-2 left-0 h-[1.5px] bg-current transition-all duration-500 origin-left scale-x-0 group-hover:scale-x-100" 
                      style={{ width: pathname === link.href ? '100%' : '0%' }}
                    />
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Section - Social Links */}
            <div className="mt-auto py-4 md:py-8 px-4 md:px-6">
              <div className="flex flex-col items-center gap-5">
                {/* Social Links */}
                {socialLinks && socialLinks.length > 0 && (
                  <div className="flex flex-col md:flex-row items-center gap-3">
                    {socialLinks.map((social, i) => {
                      const socialIconUrl = getMediaUrl(social.icon as Media);
                      
                      return (
                        <span key={i} className="flex items-center">
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-80 active:opacity-60 transition-all duration-300 hover:scale-110 flex items-center justify-center"
                            style={{
                              fontFamily: getFontFamily(social.font as Font),
                              color: social.color || data.headerTextColor || '#4a4b34'
                            }}
                          >
                            {socialIconUrl ? (
                              <div className="relative w-5 h-5">
                                <Image
                                  src={socialIconUrl}
                                  alt={social.platform || 'Social'}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                            ) : (
                              <span className="text-sm uppercase tracking-[0.25em] font-bold">
                                {social.platform}
                              </span>
                            )}
                          </a>
                          {i < socialLinks.length - 1 && (
                            <span 
                              className="hidden md:inline mx-3 opacity-20"
                              style={{ color: data.headerTextColor || '#4a4b34' }}
                            >
                              •
                            </span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                )}

                {/* Logo at Bottom */}
                {logoUrl && (
                  <div className="relative h-28 w-28 opacity-40 hover:opacity-60 transition-opacity duration-500">
                    <Image
                      src={logoUrl}
                      alt="Logo"
                      fill
                      sizes="112px"
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;

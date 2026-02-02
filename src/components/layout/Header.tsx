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

  // Detect mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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
        className="fixed w-full z-50 backdrop-blur-sm border-b"
        style={{
          backgroundColor: data.headerBackgroundColor || '#F2EBD0',
          borderBottomColor: data.headerTextColor ? `${data.headerTextColor}20` : 'rgba(74,75,52,0.15)',
          color: data.headerTextColor || '#4a4b34'
        }}
      >
        <div className="relative max-w-7xl mx-auto px-6 py-3 flex justify-between items-center h-24 md:h-32">
          {/* Hamburger Menu Button - Left */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 hover:opacity-70 rounded-md transition-opacity"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{ color: data.headerTextColor || '#4a4b34' }}
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M3 12H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M3 6H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <path d="M3 18H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            )}
          </button>

          {/* Center Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
            <div className="relative h-16 w-32 md:h-24 md:w-48">
              <Image
                src={logoUrl!}
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Right Side Icons */}
          <div className="flex items-center gap-4">
            {navIcons && navIcons.map((iconItem, i) => {
              if (iconItem.enabled === false) return null;

              const iconUrl = getMediaUrl(iconItem.icon as Media);
              
              // Check if icon should be visible on current device
              const shouldShowIcon = iconItem.showIcon === true;
              const showIconOnDevice = shouldShowIcon && (isMobile ? iconItem.showIconOnMobile !== false : iconItem.showIconOnDesktop !== false);
              
              // Check if label should be visible on current device
              const shouldShowLabel = iconItem.showLabel === true;
              const showLabelOnDevice = shouldShowLabel && (isMobile ? iconItem.showLabelOnMobile !== false : iconItem.showLabelOnDesktop !== false);
              
              // Icon or label, not both
              const iconContent = showIconOnDevice && iconUrl ? (
                <div className="relative w-5 h-5">
                  <Image
                    src={iconUrl}
                    alt={iconItem.label || 'Icon'}
                    fill
                    className="object-contain"
                  />
                </div>
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

              // Display either icon or label, not both
              const displayContent = iconContent || labelContent;

              if (!displayContent) return null;
              
              if (iconItem.type === 'search') {
                return (
                  <button
                    key={i}
                    className="hover:opacity-70 transition-opacity flex items-center justify-center"
                    aria-label={iconItem.label || 'Search'}
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
                    className="hover:opacity-70 transition-opacity flex items-center justify-center"
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
          className="fixed inset-0 z-40 overflow-y-auto"
          style={{ 
            backgroundColor: data.headerBackgroundColor || '#F2EBD0',
            color: data.headerTextColor || '#4a4b34'
          }}
        >
          <div className="min-h-screen flex flex-col">
            {/* Top Bar in Overlay */}
            <div className="relative px-6 py-3 flex justify-between items-center h-24" style={{ borderBottom: `1px solid ${data.headerTextColor}20` }}>
              {/* Close Button */}
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold hover:opacity-70 transition-opacity"
                style={{ color: data.headerTextColor || '#4a4b34' }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  <path d="M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
                CLOSE
              </button>

              {/* Center Logo */}
              <Link href="/" onClick={() => setMenuOpen(false)} className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2">
                <div className="relative h-16 w-32">
                  <Image
                    src={logoUrl!}
                    alt="Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>

              {/* Right Icons */}
              <div className="flex items-center gap-6">
                {navIcons && navIcons.map((iconItem, i) => {
                  if (iconItem.enabled === false) return null;

                  const iconUrl = getMediaUrl(iconItem.icon as Media);
                  
                  // Check if icon should be visible on current device
                  const shouldShowIcon = iconItem.showIcon === true;
                  const showIconOnDevice = shouldShowIcon && (isMobile ? iconItem.showIconOnMobile !== false : iconItem.showIconOnDesktop !== false);
                  
                  // Check if label should be visible on current device
                  const shouldShowLabel = iconItem.showLabel === true;
                  const showLabelOnDevice = shouldShowLabel && (isMobile ? iconItem.showLabelOnMobile !== false : iconItem.showLabelOnDesktop !== false);
                  
                  // Icon or label, not both
                  const iconContent = showIconOnDevice && iconUrl ? (
                    <div className="relative w-6 h-6">
                      <Image
                        src={iconUrl}
                        alt={iconItem.label || 'Icon'}
                        fill
                        className="object-contain"
                      />
                    </div>
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

                  // Display either icon or label, not both
                  const displayContent = iconContent || labelContent;

                  if (!displayContent) return null;
                  
                  if (iconItem.type === 'search') {
                    return (
                      <button
                        key={i}
                        className="hover:opacity-70 transition-opacity flex items-center justify-center"
                        aria-label={iconItem.label || 'Search'}
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
                        className="hover:opacity-70 transition-opacity flex items-center justify-center"
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
            <div className="flex-1 flex flex-col items-center justify-center min-h-0 py-4 px-6">
              <nav className="flex flex-col items-center gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.label + link.href}
                    href={link.href}
                    target={link.newTab ? "_blank" : "_self"}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl md:text-3xl uppercase tracking-[0.3em] font-bold transition-all hover:opacity-70"
                    style={{
                      fontFamily: getFontFamily(link.font),
                      color: link.color || data.headerTextColor || '#4a4b34',
                      opacity: pathname === link.href ? 1 : 0.8
                    }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Bottom Section - Social Links */}
            <div className="mt-auto py-4 px-6">
              <div className="flex flex-col items-center gap-3">
                {/* Social Links */}
                {socialLinks && socialLinks.length > 0 && (
                  <div className="flex items-center gap-2">
                    {socialLinks.map((social, i) => {
                      const socialIconUrl = getMediaUrl(social.icon as Media);
                      
                      return (
                        <span key={i} className="flex items-center">
                          <a
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:opacity-70 transition-opacity flex items-center justify-center"
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
                              className="mx-2 opacity-30"
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
                  <div className="relative h-32 w-32 opacity-60">
                    <Image
                      src={logoUrl}
                      alt="Logo"
                      fill
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

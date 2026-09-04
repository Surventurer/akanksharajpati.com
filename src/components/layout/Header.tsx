'use client';

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Header as HeaderType, Media, Font } from "@/payload-types";
import { Icon } from "@/components/ui/Icon";

// Default fallback logo
const defaultLogo = "/asset/logo.png";

interface HeaderProps {
  data?: HeaderType | null;
}

const Header = ({ data }: HeaderProps) => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // If no data from CMS, don't render header
  if (!data) {
    return null;
  }

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

  // Helper to render nav icon / label item responsively with pure CSS
  const renderNavIcon = (
    iconItem: NonNullable<HeaderType['navIcons']>[number],
    i: number,
    isOverlay = false
  ) => {
    if (iconItem.enabled === false) return null;

    const iconUrl = getMediaUrl(iconItem.icon as Media);

    // Icon visibility conditions
    const hasIcon = iconItem.showIcon !== false;
    const showIconOnMobile = hasIcon && iconItem.showIconOnMobile !== false;
    const showIconOnDesktop = hasIcon && iconItem.showIconOnDesktop === true;

    // Label visibility conditions
    const hasLabel = iconItem.showLabel === true && !!iconItem.label;
    const showLabelOnMobile = hasLabel && iconItem.showLabelOnMobile !== false;
    const showLabelOnDesktop = hasLabel && iconItem.showLabelOnDesktop !== false;

    // Overall item visibility
    const visibleOnMobile = showIconOnMobile || showLabelOnMobile;
    const visibleOnDesktop = showIconOnDesktop || showLabelOnDesktop;

    if (!visibleOnMobile && !visibleOnDesktop) return null;

    // Responsive classes for container
    let containerClass = 'flex';
    if (visibleOnMobile && !visibleOnDesktop) {
      containerClass = 'flex md:hidden';
    } else if (!visibleOnMobile && visibleOnDesktop) {
      containerClass = 'hidden md:flex';
    }

    // Responsive classes for icon
    let iconClass = '';
    if (showIconOnMobile && !showIconOnDesktop) {
      iconClass = 'inline-flex md:hidden';
    } else if (!showIconOnMobile && showIconOnDesktop) {
      iconClass = 'hidden md:inline-flex';
    } else if (showIconOnMobile && showIconOnDesktop) {
      iconClass = 'inline-flex';
    }

    const iconElement = (showIconOnMobile || showIconOnDesktop) ? (
      <span className={`items-center justify-center ${iconClass}`}>
        {iconUrl ? (
          <div className={`relative ${isOverlay ? 'w-6 h-6' : 'w-5 h-5'}`}>
            <Image
              src={iconUrl}
              alt={iconItem.label || 'Icon'}
              fill
              sizes={isOverlay ? '24px' : '20px'}
              className="object-contain"
            />
          </div>
        ) : iconItem.type === 'search' ? (
          <Icon name="search" size={isOverlay ? 20 : 18} />
        ) : iconItem.type === 'link' ? (
          <Icon name="shopping_bag" size={isOverlay ? 20 : 18} />
        ) : null}
      </span>
    ) : null;

    // Responsive classes for label
    let labelClass = '';
    if (showLabelOnMobile && !showLabelOnDesktop) {
      labelClass = 'inline md:hidden';
    } else if (!showLabelOnMobile && showLabelOnDesktop) {
      labelClass = 'hidden md:inline';
    } else if (showLabelOnMobile && showLabelOnDesktop) {
      labelClass = 'inline';
    }

    const labelElement = (showLabelOnMobile || showLabelOnDesktop) && iconItem.label ? (
      <span
        className={`${isOverlay ? 'text-xs' : 'text-[10px] md:text-xs'} uppercase tracking-widest font-bold ${labelClass}`}
        style={{
          fontFamily: getFontFamily(iconItem.font as Font),
          color: iconItem.color || data.headerTextColor || '#4a4b34',
        }}
      >
        {iconItem.label}
      </span>
    ) : null;

    const buttonClasses = `${containerClass} hover:bg-black/5 active:bg-black/10 active:scale-95 transition-all duration-200 rounded-xl p-2.5 items-center justify-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`;

    if (iconItem.type === 'search') {
      return (
        <button
          key={i}
          className={buttonClasses}
          aria-label={iconItem.label || 'Search'}
          style={{ color: data.headerTextColor || '#4a4b34' }}
        >
          {iconElement}
          {labelElement}
        </button>
      );
    }

    if (iconItem.type === 'link' && iconItem.link) {
      return (
        <Link
          key={i}
          href={iconItem.link}
          target={iconItem.newTab ? '_blank' : '_self'}
          onClick={isOverlay ? () => setMenuOpen(false) : undefined}
          className={buttonClasses}
          style={{ color: data.headerTextColor || '#4a4b34' }}
        >
          {iconElement}
          {labelElement}
        </Link>
      );
    }

    return null;
  };

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
            {navIcons && navIcons.map((iconItem, i) => renderNavIcon(iconItem, i, false))}
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
                <Icon name="close" size={16} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
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
                {navIcons && navIcons.map((iconItem, i) => renderNavIcon(iconItem, i, true))}
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
                                  sizes="20px"
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

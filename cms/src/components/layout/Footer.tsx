import Link from "next/link";
import { fetchFooter } from "@/lib/cms.server";
import { Font } from "@/payload-types";

const Footer = async () => {
  const footerData = await fetchFooter();

  // If footer is disabled or no data, don't render
  if (!footerData || !footerData.enabled) {
    return null;
  }

  // Helper function to get font family
  const getFontFamily = (font: Font | string | null | undefined): string => {
    if (!font) return 'inherit';
    if (typeof font === 'string') return 'inherit';
    return font.filename || 'inherit';
  };

  return (
    <footer className="bg-foreground text-background/60 py-20 px-6 mt-12 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 mb-20">
          {/* Brand */}
          {footerData.brandEnabled && (
            <div className="md:col-span-5 space-y-6">
              <h3 
                className="text-3xl italic text-background"
                style={{ 
                  fontFamily: getFontFamily(footerData.brandNameFont) || 'Playfair Display, serif',
                  color: footerData.brandNameColor || undefined
                }}
              >
                {footerData.brandName || 'Autumn Stories'}
              </h3>
              {footerData.brandDescription && (
                <p 
                  className="max-w-sm font-light leading-relaxed"
                  style={{
                    fontFamily: getFontFamily(footerData.brandDescriptionFont),
                    color: footerData.brandDescriptionColor || undefined
                  }}
                >
                  {footerData.brandDescription}
                </p>
              )}
              <div className="flex gap-6">
                <span className="material-symbols-outlined hover:text-accent transition-colors cursor-pointer">alternate_email</span>
                <span className="material-symbols-outlined hover:text-accent transition-colors cursor-pointer">public</span>
                <span className="material-symbols-outlined hover:text-accent transition-colors cursor-pointer">mail</span>
              </div>
            </div>
          )}

          {/* Discover Links */}
          {footerData.discoverLinksEnabled && (
            <div className="md:col-span-2 space-y-8">
              <h4 className="footer-heading">
                {footerData.discoverLinksHeading || 'Discover'}
              </h4>
              {footerData.discoverLinks && footerData.discoverLinks.length > 0 && (
                <ul className="space-y-4 text-sm">
                  {footerData.discoverLinks.map((linkItem, index) => (
                    <li key={index}>
                      {linkItem.link ? (
                        <Link 
                          href={linkItem.link} 
                          className="footer-link"
                          target={linkItem.newTab ? '_blank' : undefined}
                          rel={linkItem.newTab ? 'noopener noreferrer' : undefined}
                        >
                          {linkItem.label}
                        </Link>
                      ) : (
                        <span className="footer-link cursor-pointer">
                          {linkItem.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Information Links */}
          {footerData.infoLinksEnabled && (
            <div className="md:col-span-2 space-y-8">
              <h4 className="footer-heading">
                {footerData.infoLinksHeading || 'Information'}
              </h4>
              {footerData.infoLinks && footerData.infoLinks.length > 0 && (
                <ul className="space-y-4 text-sm">
                  {footerData.infoLinks.map((linkItem, index) => (
                    <li key={index}>
                      {linkItem.link ? (
                        <Link 
                          href={linkItem.link} 
                          className="footer-link"
                          target={linkItem.newTab ? '_blank' : undefined}
                          rel={linkItem.newTab ? 'noopener noreferrer' : undefined}
                        >
                          {linkItem.label}
                        </Link>
                      ) : (
                        <span className="footer-link cursor-pointer">
                          {linkItem.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {/* Newsletter */}
          {footerData.newsletterEnabled && (
            <div className="md:col-span-3 space-y-8">
              <h4 
                className="footer-heading"
                style={{
                  fontFamily: getFontFamily(footerData.newsletterHeadingFont),
                  color: footerData.newsletterHeadingColor || undefined
                }}
              >
                {footerData.newsletterHeading || 'Newsletter'}
              </h4>
              <div className="flex border-b border-background/20 pb-2">
                <input
                  className="bg-transparent border-none focus:ring-0 p-0 text-sm w-full placeholder:text-background/20 text-background focus:outline-none"
                  placeholder="Enter your email"
                  type="email"
                />
                <button className="material-symbols-outlined text-accent">east</button>
              </div>
              {footerData.newsletterDescription && (
                <p 
                  className="text-[10px] italic"
                  style={{
                    fontFamily: getFontFamily(footerData.newsletterDescriptionFont),
                    color: footerData.newsletterDescriptionColor || undefined
                  }}
                >
                  {footerData.newsletterDescription}
                </p>
              )}
            </div>
          )}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-background/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[9px] uppercase tracking-[0.3em] font-medium">
          {/* Copyright */}
          {footerData.copyrightEnabled && (
            <p 
              style={{
                fontFamily: getFontFamily(footerData.copyrightTextFont),
                color: footerData.copyrightTextColor || undefined
              }}
            >
              {footerData.copyrightText || '© 2024 Autumn Stories. All Rights Reserved.'}
            </p>
          )}
          
          {/* Social Links */}
          {footerData.socialLinksEnabled && footerData.socialLinks && footerData.socialLinks.length > 0 && (
            <div className="flex gap-8">
              {footerData.socialLinks.map((social, index) => {
                // @ts-ignore
                const shouldShowIcon = social.showIcon !== false;
                // @ts-ignore
                const customIcon = social.icon?.url;
                
                return social.url ? (
                  <Link 
                    key={index}
                    href={social.url}
                    className="hover:text-accent transition-colors cursor-pointer flex items-center gap-2"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {shouldShowIcon && customIcon && (
                      <img src={customIcon} alt={social.platform} className="w-4 h-4" />
                    )}
                    {social.platform}
                  </Link>
                ) : (
                  <span 
                    key={index}
                    className="hover:text-accent transition-colors cursor-pointer flex items-center gap-2"
                  >
                    {shouldShowIcon && customIcon && (
                      <img src={customIcon} alt={social.platform} className="w-4 h-4" />
                    )}
                    {social.platform}
                  </span>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;

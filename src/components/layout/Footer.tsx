import Link from "next/link";
import { fetchFooter } from "@/lib/cms";
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
    <footer className="bg-foreground text-background/60 pt-20 pb-8 px-6 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
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
                  className="max-w-sm font-light leading-relaxed text-background/60"
                  style={{
                    fontFamily: getFontFamily(footerData.brandDescriptionFont),
                    color: footerData.brandDescriptionColor || undefined
                  }}
                >
                  {footerData.brandDescription}
                </p>
              )}
              <div className="flex gap-3">
                <span className="material-symbols-outlined hover:text-accent transition-all duration-300 cursor-pointer hover:scale-110 rounded-full p-2 hover:bg-background/10">alternate_email</span>
                <span className="material-symbols-outlined hover:text-accent transition-all duration-300 cursor-pointer hover:scale-110 rounded-full p-2 hover:bg-background/10">public</span>
                <span className="material-symbols-outlined hover:text-accent transition-all duration-300 cursor-pointer hover:scale-110 rounded-full p-2 hover:bg-background/10">mail</span>
              </div>
            </div>
          )}

          {/* Discover Links */}
          {footerData.discoverLinksEnabled && (
            <div className="md:col-span-2 space-y-6">
              <h4 className="footer-heading">
                {footerData.discoverLinksHeading || 'Discover'}
              </h4>
              {footerData.discoverLinks && footerData.discoverLinks.length > 0 && (
                <ul className="space-y-3 text-sm">
                  {footerData.discoverLinks.map((linkItem, index) => (
                    <li key={index}>
                      {linkItem.link ? (
                        <Link 
                          href={linkItem.link} 
                          className="footer-link text-background/50 hover:text-accent transition-all duration-200"
                          target={linkItem.newTab ? '_blank' : undefined}
                          rel={linkItem.newTab ? 'noopener noreferrer' : undefined}
                        >
                          {linkItem.label}
                        </Link>
                      ) : (
                        <span className="footer-link cursor-pointer text-background/50 hover:text-accent transition-all duration-200">
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
            <div className="md:col-span-2 space-y-6">
              <h4 className="footer-heading">
                {footerData.infoLinksHeading || 'Information'}
              </h4>
              {footerData.infoLinks && footerData.infoLinks.length > 0 && (
                <ul className="space-y-3 text-sm">
                  {footerData.infoLinks.map((linkItem, index) => (
                    <li key={index}>
                      {linkItem.link ? (
                        <Link 
                          href={linkItem.link} 
                          className="footer-link text-background/50 hover:text-accent transition-all duration-200"
                          target={linkItem.newTab ? '_blank' : undefined}
                          rel={linkItem.newTab ? 'noopener noreferrer' : undefined}
                        >
                          {linkItem.label}
                        </Link>
                      ) : (
                        <span className="footer-link cursor-pointer text-background/50 hover:text-accent transition-all duration-200">
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
            <div className="md:col-span-3 space-y-6">
              <h4 
                className="footer-heading"
                style={{
                  fontFamily: getFontFamily(footerData.newsletterHeadingFont),
                  color: footerData.newsletterHeadingColor || undefined
                }}
              >
                {footerData.newsletterHeading || 'Newsletter'}
              </h4>
              <div className="flex items-center gap-2 rounded-xl border border-background/20 bg-background/5 px-4 py-2.5 transition-all duration-200 focus-within:border-accent/50 focus-within:ring-1 focus-within:ring-accent/30 focus-within:bg-background/10">
                <input
                  className="bg-transparent border-none p-0 text-sm w-full placeholder:text-background/30 text-background focus:outline-none"
                  placeholder="Enter your email"
                  type="email"
                />
                <button className="material-symbols-outlined text-accent hover:translate-x-1 transition-transform duration-200 rounded-full p-1 hover:bg-background/10">east</button>
              </div>
              {footerData.newsletterDescription && (
                <p 
                  className="text-xs italic text-background/40"
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
        <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] uppercase tracking-[0.25em] font-medium">
          {/* Copyright */}
          {footerData.copyrightEnabled && (
            <p 
              className="text-background/40"
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
            <div className="flex gap-6">
              {footerData.socialLinks.map((social, index) => {
                // @ts-ignore
                const shouldShowIcon = social.showIcon !== false;
                // @ts-ignore
                const customIcon = social.icon?.url;
                
                return social.url ? (
                  <Link 
                    key={index}
                    href={social.url}
                    className="hover:text-accent transition-all duration-300 cursor-pointer flex items-center gap-2 hover:scale-105 text-background/50"
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
                    className="hover:text-accent transition-all duration-300 cursor-pointer flex items-center gap-2 hover:scale-105 text-background/50"
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

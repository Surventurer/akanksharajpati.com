'use client'
import React from 'react'

/* ─────────────────────────────────────────────
   Quick Action Items
   ───────────────────────────────────────────── */
const quickActions = [
  {
    label: 'New Article',
    href: '/admin/collections/articles/create',
    icon: '✏️',
    desc: 'Write a new blog post',
    accent: '#B88078',
  },
  {
    label: 'Upload Media',
    href: '/admin/collections/media/create',
    icon: '🖼️',
    desc: 'Add images or assets',
    accent: '#C49A48',
  },
  {
    label: 'Manage Comments',
    href: '/admin/collections/comments',
    icon: '💬',
    desc: 'Review & moderate',
    accent: '#6b8d4f',
  },
]

const pageLinks = [
  { label: 'Home Page', href: '/admin/globals/home-page', icon: '🏠' },
  { label: 'Blog Page', href: '/admin/globals/blog-page', icon: '📝' },
  { label: 'About Page', href: '/admin/globals/about-page', icon: '👤' },
  { label: 'Shop Page', href: '/admin/globals/shop-page', icon: '🛍️' },
  { label: 'Contact Page', href: '/admin/globals/contact-page', icon: '✉️' },
  { label: 'Watch Page', href: '/admin/globals/watch-page', icon: '🎬' },
]

const designLinks = [
  { label: 'Header', href: '/admin/globals/header', icon: '🎨' },
  { label: 'Footer', href: '/admin/globals/footer', icon: '📐' },
  { label: 'Newsletter Popup', href: '/admin/globals/join-our-inner-circle', icon: '💌' },
]

const settingsLinks = [
  { label: 'My Account', href: '/admin/account', icon: '🔑' },
  { label: 'All Users', href: '/admin/collections/users', icon: '👥' },
  { label: 'All Media', href: '/admin/collections/media', icon: '📁' },
  { label: 'Fonts', href: '/admin/collections/fonts', icon: '🔤' },
]

/* ─────────────────────────────────────────────
   Styles (using CSS vars for dark/light mode)
   ───────────────────────────────────────────── */
const wrap: React.CSSProperties = {
  maxWidth: '960px',
  margin: '0 auto',
  padding: '28px 20px 40px',
  fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif",
}

const heroBanner: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(184,128,120,0.10) 0%, rgba(196,154,72,0.07) 50%, rgba(107,141,79,0.05) 100%)',
  border: '1px solid var(--theme-border-color)',
  borderRadius: '16px',
  padding: '32px 28px',
  marginBottom: '28px',
  position: 'relative',
  overflow: 'hidden',
}

const heroContent: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '18px',
}

const heroLogo: React.CSSProperties = {
  width: '52px',
  height: '52px',
  borderRadius: '14px',
  objectFit: 'cover',
  border: '2px solid var(--theme-border-color)',
  flexShrink: 0,
}

const heroTitle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: '24px',
  fontWeight: 700,
  color: 'var(--theme-text)',
  margin: 0,
  lineHeight: 1.2,
}

const heroSub: React.CSSProperties = {
  fontSize: '14px',
  color: 'var(--theme-elevation-650)',
  margin: '4px 0 0',
  lineHeight: 1.5,
}

const sectionTitle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: '15px',
  fontWeight: 700,
  color: 'var(--theme-elevation-600)',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.07em',
  margin: '0 0 14px 2px',
}

const cardGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
  gap: '14px',
  marginBottom: '32px',
}

const smallGrid: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
  gap: '10px',
  marginBottom: '32px',
}

const actionCardBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '14px',
  padding: '18px 20px',
  borderRadius: '12px',
  border: '1px solid var(--theme-border-color)',
  background: 'var(--theme-elevation-0)',
  textDecoration: 'none',
  transition: 'all 0.2s ease',
  cursor: 'pointer',
}

const actionIcon: React.CSSProperties = {
  fontSize: '26px',
  lineHeight: 1,
  flexShrink: 0,
}

const actionLabel: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 700,
  color: 'var(--theme-text)',
  margin: 0,
  lineHeight: 1.3,
}

const actionDesc: React.CSSProperties = {
  fontSize: '12px',
  color: 'var(--theme-elevation-550)',
  margin: '2px 0 0',
  lineHeight: 1.4,
}

const smallCardBase: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 16px',
  borderRadius: '10px',
  border: '1px solid var(--theme-border-color)',
  background: 'var(--theme-elevation-0)',
  textDecoration: 'none',
  transition: 'all 0.18s ease',
  cursor: 'pointer',
}

const smallIcon: React.CSSProperties = {
  fontSize: '18px',
  lineHeight: 1,
  flexShrink: 0,
}

const smallLabel: React.CSSProperties = {
  fontSize: '13px',
  fontWeight: 600,
  color: 'var(--theme-text)',
}

const divider: React.CSSProperties = {
  height: '1px',
  background: 'var(--theme-border-color)',
  margin: '8px 0 24px',
  border: 'none',
}

const tipBox: React.CSSProperties = {
  display: 'flex',
  alignItems: 'flex-start',
  gap: '12px',
  padding: '16px 20px',
  borderRadius: '12px',
  background: 'linear-gradient(135deg, rgba(107,141,79,0.06) 0%, rgba(196,154,72,0.04) 100%)',
  border: '1px solid var(--theme-border-color)',
}

const tipIcon: React.CSSProperties = {
  fontSize: '20px',
  flexShrink: 0,
  marginTop: '1px',
}

const tipText: React.CSSProperties = {
  fontSize: '13px',
  color: 'var(--theme-elevation-650)',
  lineHeight: 1.6,
  margin: 0,
}

const tipStrong: React.CSSProperties = {
  color: 'var(--theme-text)',
  fontWeight: 700,
}

/* ─────────────────────────────────────────────
   Interactive Card Components
   ───────────────────────────────────────────── */
const ActionCard: React.FC<{
  item: typeof quickActions[0]
}> = ({ item }) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <a
      href={item.href}
      style={{
        ...actionCardBase,
        borderColor: hovered ? item.accent : undefined,
        boxShadow: hovered ? `0 4px 20px ${item.accent}18` : undefined,
        transform: hovered ? 'translateY(-2px)' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={actionIcon}>{item.icon}</span>
      <div>
        <p style={actionLabel}>{item.label}</p>
        <p style={actionDesc}>{item.desc}</p>
      </div>
    </a>
  )
}

const SmallCard: React.FC<{
  item: { label: string; href: string; icon: string }
}> = ({ item }) => {
  const [hovered, setHovered] = React.useState(false)
  return (
    <a
      href={item.href}
      style={{
        ...smallCardBase,
        background: hovered ? 'var(--theme-elevation-100)' : undefined,
        transform: hovered ? 'translateY(-1px)' : undefined,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={smallIcon}>{item.icon}</span>
      <span style={smallLabel}>{item.label}</span>
    </a>
  )
}

/* ─────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────── */
const Welcome: React.FC = () => {
  return (
    <div style={wrap}>
      {/* Hero Banner */}
      <div style={heroBanner}>
        <div style={heroContent}>
          <img src="/asset/logo.png" alt="Logo" style={heroLogo} />
          <div>
            <h2 style={heroTitle}>Welcome back, Curator</h2>
            <p style={heroSub}>
              Your creative studio awaits. Manage content, design, and media — all in one place.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <h3 style={sectionTitle}>Quick Actions</h3>
      <div style={cardGrid}>
        {quickActions.map((item) => (
          <ActionCard key={item.href} item={item} />
        ))}
      </div>

      <hr style={divider} />

      {/* Edit Pages */}
      <h3 style={sectionTitle}>Edit Pages</h3>
      <div style={smallGrid}>
        {pageLinks.map((item) => (
          <SmallCard key={item.href} item={item} />
        ))}
      </div>

      <hr style={divider} />

      {/* Design & Layout */}
      <h3 style={sectionTitle}>Design & Layout</h3>
      <div style={smallGrid}>
        {designLinks.map((item) => (
          <SmallCard key={item.href} item={item} />
        ))}
      </div>

      <hr style={divider} />

      {/* Settings & Account */}
      <h3 style={sectionTitle}>Settings & Account</h3>
      <div style={smallGrid}>
        {settingsLinks.map((item) => (
          <SmallCard key={item.href} item={item} />
        ))}
      </div>

      <hr style={divider} />

      {/* Pro Tip */}
      <div style={tipBox}>
        <span style={tipIcon}>💡</span>
        <p style={tipText}>
          <span style={tipStrong}>Pro Tip:</span>{' '}
          Go to <a href="/admin/account" style={{ color: '#B88078', fontWeight: 600 }}>My Account</a> to
          change your password, update your profile photo, or manage your session.
          Use the <strong>theme toggle</strong> in the bottom of the sidebar to switch between
          light and dark mode.
        </p>
      </div>
    </div>
  )
}

export default Welcome

'use client'
import React from 'react'

interface Permission {
  read?: boolean
  create?: boolean
  update?: boolean
  delete?: boolean
}

interface RoleData {
  name: string
  isOwner?: boolean
  content?: {
    articles?: Permission
    articleAuthors?: Permission
    comments?: Permission
  }
  pages?: {
    homePage?: Permission
    blogPage?: Permission
    aboutPage?: Permission
    shopPage?: Permission
    contactPage?: Permission
    watchPage?: Permission
  }
  design?: {
    header?: Permission
    footer?: Permission
    joinOurInnerCircle?: Permission
  }
  media?: {
    mediaFiles?: Permission
    fonts?: Permission
  }
  admin?: {
    users?: Permission
    roles?: Permission
  }
}

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
  justifyContent: 'space-between',
  gap: '18px',
}

const heroLeft: React.CSSProperties = {
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

const roleBadge: React.CSSProperties = {
  display: 'inline-block',
  padding: '4px 14px',
  borderRadius: '20px',
  background: 'rgba(184, 128, 120, 0.12)',
  color: '#B88078',
  fontSize: '12px',
  fontWeight: 700,
  letterSpacing: '0.03em',
  textTransform: 'uppercase',
  border: '1px solid rgba(184, 128, 120, 0.2)',
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

const logoutBtn: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  padding: '8px 18px',
  borderRadius: '8px',
  border: '1px solid rgba(184, 128, 120, 0.3)',
  background: 'transparent',
  color: '#B88078',
  fontSize: '13px',
  fontWeight: 600,
  cursor: 'pointer',
  fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif",
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap' as const,
}

const ActionCard: React.FC<{
  item: { label: string; href: string; icon: string; desc: string; accent: string }
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

const Welcome: React.FC = () => {
  const [roleData, setRoleData] = React.useState<RoleData | null>(null)
  const [userName, setUserName] = React.useState('Curator')

  React.useEffect(() => {
    fetch('/api/users/me?depth=1')
      .then((res) => res.json())
      .then((data) => {
        if (data?.user) {
          setUserName(data.user.name || 'Curator')
          if (data.user.role) {
            setRoleData(data.user.role as RoleData)
          }
        }
      })
      .catch(() => {})
  }, [])

  const isOwner = roleData?.isOwner
  const hasPerm = (category: keyof RoleData, resource: string, action: string = 'update'): boolean => {
    if (isOwner) return true
    const cat = roleData?.[category] as Record<string, any> | undefined
    if (!cat) return false
    const res = cat[resource]
    if (!res) return false
    return !!res[action]
  }

  const showPages =
    hasPerm('pages', 'homePage') ||
    hasPerm('pages', 'blogPage') ||
    hasPerm('pages', 'aboutPage') ||
    hasPerm('pages', 'shopPage') ||
    hasPerm('pages', 'contactPage') ||
    hasPerm('pages', 'watchPage')
  const showDesign =
    hasPerm('design', 'header') ||
    hasPerm('design', 'footer') ||
    hasPerm('design', 'joinOurInnerCircle')
  const showSettings =
    hasPerm('admin', 'users', 'read') ||
    hasPerm('media', 'mediaFiles', 'read') ||
    hasPerm('media', 'fonts', 'read')

  const quickActions = [
    ...(hasPerm('content', 'articles', 'create')
      ? [{ label: 'New Article', href: '/admin/collections/articles/create', icon: '✏️', desc: 'Write a new blog post', accent: '#B88078' }]
      : []),
    ...(hasPerm('media', 'mediaFiles', 'create')
      ? [{ label: 'Upload Media', href: '/admin/collections/media/create', icon: '🖼️', desc: 'Add images or assets', accent: '#C49A48' }]
      : []),
    ...(hasPerm('content', 'comments')
      ? [{ label: 'Manage Comments', href: '/admin/collections/comments', icon: '💬', desc: 'Review & moderate', accent: '#6b8d4f' }]
      : []),
  ]

  const pageLinks = [
    ...(hasPerm('pages', 'homePage') ? [{ label: 'Home Page', href: '/admin/globals/home-page', icon: '🏠' }] : []),
    ...(hasPerm('pages', 'blogPage') ? [{ label: 'Blog Page', href: '/admin/globals/blog-page', icon: '📝' }] : []),
    ...(hasPerm('pages', 'aboutPage') ? [{ label: 'About Page', href: '/admin/globals/about-page', icon: '👤' }] : []),
    ...(hasPerm('pages', 'shopPage') ? [{ label: 'Shop Page', href: '/admin/globals/shop-page', icon: '🛍️' }] : []),
    ...(hasPerm('pages', 'contactPage') ? [{ label: 'Contact Page', href: '/admin/globals/contact-page', icon: '✉️' }] : []),
    ...(hasPerm('pages', 'watchPage') ? [{ label: 'Watch Page', href: '/admin/globals/watch-page', icon: '🎬' }] : []),
  ]

  const designLinks = [
    ...(hasPerm('design', 'header') ? [{ label: 'Header', href: '/admin/globals/header', icon: '🎨' }] : []),
    ...(hasPerm('design', 'footer') ? [{ label: 'Footer', href: '/admin/globals/footer', icon: '📐' }] : []),
    ...(hasPerm('design', 'joinOurInnerCircle') ? [{ label: 'Newsletter Popup', href: '/admin/globals/join-our-inner-circle', icon: '💌' }] : []),
  ]

  const settingsLinks = [
    { label: 'My Account', href: '/admin/account', icon: '🔑' },
    ...(hasPerm('admin', 'users', 'read') ? [{ label: 'All Users', href: '/admin/collections/users', icon: '👥' }] : []),
    ...(hasPerm('media', 'mediaFiles', 'read') ? [{ label: 'All Media', href: '/admin/collections/media', icon: '📁' }] : []),
    ...(hasPerm('media', 'fonts', 'read') ? [{ label: 'Fonts', href: '/admin/collections/fonts', icon: '🔤' }] : []),
  ]

  const handleLogout = async () => {
    try {
      await fetch('/api/users/logout', { method: 'POST' })
    } catch {}
    window.location.href = '/'
  }

  if (quickActions.length === 0 && pageLinks.length === 0 && designLinks.length === 0) {
    return (
      <div style={wrap}>
        <div style={heroBanner}>
          <div style={heroContent}>
            <div style={heroLeft}>
              <img src="/asset/logo.png" alt="Logo" style={heroLogo} />
              <div>
                <h2 style={heroTitle}>Welcome, {userName}</h2>
                <p style={heroSub}>Your account has limited access. Contact an owner for permissions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={wrap}>
      <div style={heroBanner}>
        <div style={heroContent}>
          <div style={heroLeft}>
            <img src="/asset/logo.png" alt="Logo" style={heroLogo} />
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <h2 style={heroTitle}>Welcome back, {userName}</h2>
                {roleData?.name && <span style={roleBadge}>{roleData.name}</span>}
              </div>
              <p style={heroSub}>
                {isOwner
                  ? 'You have full access to all resources.'
                  : 'Your creative studio awaits. Manage content, design, and media — all in one place.'}
              </p>
            </div>
          </div>
          <button
            type="button"
            style={logoutBtn}
            onClick={handleLogout}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(184, 128, 120, 0.08)'
              e.currentTarget.style.borderColor = '#B88078'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.borderColor = 'rgba(184, 128, 120, 0.3)'
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
          </button>
        </div>
      </div>

      {quickActions.length > 0 && (
        <>
          <h3 style={sectionTitle}>Quick Actions</h3>
          <div style={cardGrid}>
            {quickActions.map((item) => (
              <ActionCard key={item.href} item={item} />
            ))}
          </div>
          <hr style={divider} />
        </>
      )}

      {showPages && pageLinks.length > 0 && (
        <>
          <h3 style={sectionTitle}>Edit Pages</h3>
          <div style={smallGrid}>
            {pageLinks.map((item) => (
              <SmallCard key={item.href} item={item} />
            ))}
          </div>
          <hr style={divider} />
        </>
      )}

      {showDesign && designLinks.length > 0 && (
        <>
          <h3 style={sectionTitle}>Design & Layout</h3>
          <div style={smallGrid}>
            {designLinks.map((item) => (
              <SmallCard key={item.href} item={item} />
            ))}
          </div>
          <hr style={divider} />
        </>
      )}

      {showSettings && settingsLinks.length > 0 && (
        <>
          <h3 style={sectionTitle}>Settings & Account</h3>
          <div style={smallGrid}>
            {settingsLinks.map((item) => (
              <SmallCard key={item.href} item={item} />
            ))}
          </div>
          <hr style={divider} />
        </>
      )}

      <div style={tipBox}>
        <span style={tipIcon}>💡</span>
        <p style={tipText}>
          <span style={tipStrong}>Pro Tip:</span>{' '}
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
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

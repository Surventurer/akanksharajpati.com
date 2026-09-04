'use client'
import React from 'react'

const logoStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '0 12px',
}

const imageStyle: React.CSSProperties = {
  width: '36px',
  height: '36px',
  objectFit: 'contain',
  borderRadius: '6px',
}

const textStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: '18px',
  fontWeight: 600,
  color: 'var(--theme-text)',
  letterSpacing: '0.02em',
  whiteSpace: 'nowrap',
}

const Logo: React.FC = () => {
  return (
    <div style={logoStyle}>
      <style>{`
        .admin-logo-dark { display: none; }
        .admin-logo-light { display: block; }
        [data-theme="dark"] .admin-logo-dark { display: block; }
        [data-theme="dark"] .admin-logo-light { display: none; }
        [data-theme="auto"] .admin-logo-dark { display: block; }
        [data-theme="auto"] .admin-logo-light { display: none; }
        @media (prefers-color-scheme: light) {
          [data-theme="auto"] .admin-logo-dark { display: none; }
          [data-theme="auto"] .admin-logo-light { display: block; }
        }
      `}</style>
      <img
        src="/asset/logo.png"
        alt="Akanksha Rajpati"
        className="admin-logo-light"
        style={imageStyle}
      />
      <img
        src="/asset/logo-white.png"
        alt="Akanksha Rajpati"
        className="admin-logo-dark"
        style={imageStyle}
      />
      <span style={textStyle}>Admin</span>
    </div>
  )
}

export default Logo


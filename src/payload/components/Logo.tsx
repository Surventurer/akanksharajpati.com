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
      <img
        src="/asset/logo.png"
        alt="Akanksha Rajpati"
        style={imageStyle}
      />
      <span style={textStyle}>Admin</span>
    </div>
  )
}

export default Logo

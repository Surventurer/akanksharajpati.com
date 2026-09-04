'use client'
import React from 'react'

const iconStyle: React.CSSProperties = {
  width: '28px',
  height: '28px',
  objectFit: 'contain',
  borderRadius: '4px',
}

const Icon: React.FC = () => {
  return (
    <>
      <style>{`
        .admin-icon-dark { display: none; }
        .admin-icon-light { display: block; }
        [data-theme="dark"] .admin-icon-dark { display: block; }
        [data-theme="dark"] .admin-icon-light { display: none; }
        [data-theme="auto"] .admin-icon-dark { display: block; }
        [data-theme="auto"] .admin-icon-light { display: none; }
        @media (prefers-color-scheme: light) {
          [data-theme="auto"] .admin-icon-dark { display: none; }
          [data-theme="auto"] .admin-icon-light { display: block; }
        }
      `}</style>
      <img
        src="/asset/logo.png"
        alt="Akanksha Rajpati"
        className="admin-icon-light"
        style={iconStyle}
      />
      <img
        src="/asset/logo-white.png"
        alt="Akanksha Rajpati"
        className="admin-icon-dark"
        style={iconStyle}
      />
    </>
  )
}

export default Icon


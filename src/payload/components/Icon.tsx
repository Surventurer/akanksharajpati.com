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
    <img
      src="/asset/logo.png"
      alt="Akanksha Rajpati"
      style={iconStyle}
    />
  )
}

export default Icon

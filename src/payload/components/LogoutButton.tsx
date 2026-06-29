'use client'
import React from 'react'

const buttonStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    padding: '10px 16px',
    border: '1px solid rgba(184, 128, 120, 0.3)',
    borderRadius: '8px',
    background: 'transparent',
    color: '#B88078',
    fontSize: '14px',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    fontFamily: "'Nunito', -apple-system, BlinkMacSystemFont, sans-serif",
    marginTop: '8px',
}

const LogoutButton: React.FC = () => {
    const [hovered, setHovered] = React.useState(false)

    const handleLogout = async () => {
        try {
            await fetch('/api/users/logout', { method: 'POST' })
        } catch {
            // proceed with redirect regardless
        }
        window.location.href = '/'
    }

    return (
        <button
            type="button"
            style={{
                ...buttonStyle,
                background: hovered ? 'rgba(184, 128, 120, 0.08)' : 'transparent',
                borderColor: hovered ? '#B88078' : 'rgba(184, 128, 120, 0.3)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleLogout}
        >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16 17 21 12 16 7" />
                <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Logout
        </button>
    )
}

export default LogoutButton

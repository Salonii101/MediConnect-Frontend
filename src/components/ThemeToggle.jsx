import React, { useEffect, useRef, useState } from 'react'

const THEMES = [
  { id:'light',  label:'Zoom Blue', color:'#0060FF', gradient:'linear-gradient(135deg,#0060FF 0%,#0099D4 100%)' },
  { id:'dark',   label:'Deep Space', color:'#4A8FFF', gradient:'linear-gradient(135deg,#08101C 0%,#4A8FFF 100%)' },
  { id:'forest', label:'Emerald',   color:'#047857', gradient:'linear-gradient(135deg,#047857 0%,#059669 100%)' },
  { id:'purple', label:'Royal Purple',  color:'#5B16CC', gradient:'linear-gradient(135deg,#5B16CC 0%,#8530E0 100%)' },
  { id:'sunset', label:'Amber',         color:'#B45309', gradient:'linear-gradient(135deg,#B45309 0%,#C2510A 100%)' },
  { id:'rose',   label:'Rose Health', color:'#BE0A38', gradient:'linear-gradient(135deg,#9A0830 0%,#BE0A38 100%)' },
]

export default function ThemeToggle() {
  const [active, setActive] = useState(() => {
    if (typeof window === 'undefined') return 'light'
    const saved = localStorage.getItem('mediconnect-theme')
    if (saved && THEMES.find(t => t.id === saved)) return saved
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // Apply theme
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', active)
    localStorage.setItem('mediconnect-theme', active)
  }, [active])

  // Click outside closes dropdown
  useEffect(() => {
    const fn = e => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', fn)
    return () => document.removeEventListener('mousedown', fn)
  }, [])

  const current = THEMES.find(t => t.id === active)

  return (
    <div ref={ref} style={{ position:'relative', zIndex:200 }}>

      {/* ── Trigger ── */}
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-label="Switch color theme"
        aria-expanded={open}
        style={{
          display:'flex', alignItems:'center', gap:8,
          padding:'6px 12px 6px 6px',
          border:`1px solid ${open ? 'var(--ac1)' : 'var(--bd2)'}`,
          borderRadius:8,
          background:'var(--bg-card)',
          cursor:'pointer',
          transition:'border-color 0.16s, box-shadow 0.16s',
          boxShadow: open ? '0 0 0 3px var(--ac1-bg)' : 'var(--sh-xs)',
        }}
      >
        {/* Active swatch */}
        <span style={{
          width:18, height:18, borderRadius:'50%',
          background:current.gradient, flexShrink:0,
          boxShadow:'0 1px 5px rgba(0,0,0,0.20)',
        }}/>

        {/* Label — hidden on small screens */}
        <span
          className="hidden sm:block"
          style={{
            fontFamily:'var(--fb)', fontSize:'0.80rem', fontWeight:500,
            color:'var(--tx-b)', whiteSpace:'nowrap',
          }}
        >
          {current.label}
        </span>

        {/* Chevron */}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
          stroke="var(--tx-m)" strokeWidth="2.5" strokeLinecap="round"
          style={{ transition:'transform 0.20s', transform: open ? 'rotate(180deg)' : 'none', flexShrink:0 }}
        >
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {/* ── Dropdown ── */}
      {open && (
        <div style={{
          position:'absolute', top:'calc(100% + 8px)', right:0,
          width:205,
          background:'var(--bg-card)',
          border:'1px solid var(--bd2)',
          borderRadius:14,
          boxShadow:'var(--sh-lg)',
          overflow:'hidden',
          animation:'slideDown 0.16s ease both',
          zIndex:400,
        }}>

          {/* Header */}
          <div style={{ padding:'10px 14px 8px', borderBottom:'1px solid var(--bd)' }}>
            <p style={{
              fontFamily:'var(--fb)', fontSize:'0.62rem', fontWeight:700,
              color:'var(--tx-m)', letterSpacing:'0.12em', textTransform:'uppercase',
            }}>
              Color Theme
            </p>
          </div>

          {/* Options */}
          {THEMES.map(theme => {
            const on = active === theme.id
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => { setActive(theme.id); setOpen(false) }}
                style={{
                  display:'flex', alignItems:'center', gap:10,
                  width:'100%', padding:'9px 14px',
                  background: on ? 'var(--ac1-bg)' : 'transparent',
                  border:'none', cursor:'pointer',
                  transition:'background 0.14s',
                  borderLeft: on ? '2.5px solid var(--ac1)' : '2.5px solid transparent',
                }}
                onMouseEnter={e => { if (!on) e.currentTarget.style.background='var(--bg-card2)' }}
                onMouseLeave={e => { if (!on) e.currentTarget.style.background='transparent' }}
              >
                {/* Swatch circle */}
                <span style={{
                  width:24, height:24, borderRadius:'50%', flexShrink:0,
                  background:theme.gradient,
                  boxShadow: on ? `0 0 0 2.5px ${theme.color}44` : '0 1px 4px rgba(0,0,0,0.16)',
                  transition:'box-shadow 0.18s',
                }}/>

                {/* Name */}
                <span style={{
                  flex:1, textAlign:'left',
                  fontFamily:'var(--fb)', fontSize:'0.84rem',
                  fontWeight: on ? 600 : 400,
                  color: on ? 'var(--ac1)' : 'var(--tx-b)',
                }}>
                  {theme.label}
                </span>

                {/* Checkmark */}
                {on && (
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="var(--ac1)" strokeWidth="2.5" strokeLinecap="round"
                  >
                    <path d="M20 6L9 17l-5-5"/>
                  </svg>
                )}
              </button>
            )
          })}

        </div>
      )}
    </div>
  )
}
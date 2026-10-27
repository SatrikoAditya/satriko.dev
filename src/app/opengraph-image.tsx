import { ImageResponse } from 'next/og'

import { site } from '@constants/site'

export const alt = `${site.name} · ${site.title}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpengraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 96,
        background: '#ffffff',
        color: '#242424',
      }}
    >
      <div style={{ fontSize: 28, color: '#1a8917' }}>
        ● Open to work &amp; collaboration
      </div>
      <div style={{ fontSize: 84, fontWeight: 700, marginTop: 24 }}>
        {site.name}
      </div>
      <div style={{ fontSize: 40, color: '#6b6b6b', marginTop: 8 }}>
        {site.title}
      </div>
      <div style={{ fontSize: 28, color: '#6b6b6b', marginTop: 56 }}>
        satriko.dev
      </div>
    </div>,
    size,
  )
}

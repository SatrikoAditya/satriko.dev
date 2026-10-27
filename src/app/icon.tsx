import { ImageResponse } from 'next/og'

export const size = { width: 96, height: 96 }
export const contentType = 'image/png'

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#191919',
        color: '#ffffff',
        fontSize: 44,
        fontWeight: 700,
        letterSpacing: -1.5,
        borderRadius: 21,
      }}
    >
      SA
    </div>,
    size,
  )
}

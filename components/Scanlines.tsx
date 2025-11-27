'use client'

export default function Scanlines() {
  return (
    <div
      className="fixed inset-0 pointer-events-none opacity-[0.03] z-[9999]"
      style={{
        background: `repeating-linear-gradient(
          0deg,
          transparent,
          transparent 2px,
          color-mix(in srgb, var(--matrix-green) 10%, transparent) 2px,
          color-mix(in srgb, var(--matrix-green) 10%, transparent) 4px
        )`,
      }}
    />
  )
}


interface ProductMockupProps {
  shortName: string
  shade?: string
  compact?: boolean
}

export function ProductMockup({ shortName, shade = '#8A0917', compact = false }: ProductMockupProps) {
  return (
    <div
      className={`pkg-mockup${compact ? ' pkg-mockup--compact' : ''}`}
      style={{ background: shade }}
    >
      <span className="pkg-mockup__brand">{shortName}</span>
      <span className="pkg-mockup__sub">yumi</span>
      <span className="pkg-mockup__grain" style={{ top: '18%', left: '14%' }} />
      <span className="pkg-mockup__grain" style={{ bottom: '22%', right: '18%' }} />
    </div>
  )
}

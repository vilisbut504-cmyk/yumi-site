import Image from 'next/image'
import fs from 'fs'
import path from 'path'

interface ProductMockupProps {
  shortName: string
  bg?: string
  accent?: string
}

export function ProductMockup({ shortName, bg = '#EDE0D0', accent = '#681B1A' }: ProductMockupProps) {
  const hasMark = fs.existsSync(path.join(process.cwd(), 'public', 'logo-yumi-mark.png'))

  return (
    <div className="pkg-mockup" style={{ background: bg }}>
      <div className="pkg-mockup__bag" style={{ borderColor: accent }}>
        {hasMark ? (
          <Image
            src="/logo-yumi-mark.png"
            alt=""
            width={64}
            height={64}
            className="pkg-mockup__mark"
          />
        ) : (
          <span className="pkg-mockup__brand">ЮМИ</span>
        )}
        <span className="pkg-mockup__line-name">{shortName}</span>
      </div>
      <div className="pkg-mockup__accent" style={{ background: accent }} />
    </div>
  )
}

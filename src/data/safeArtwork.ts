type ArtOrientation = 'wide' | 'tall' | 'square'
type ArtMotif =
  | 'letter'
  | 'camera'
  | 'music'
  | 'route'
  | 'cake'
  | 'flower'
  | 'moon'
  | 'coffee'
  | 'ticket'
  | 'balloon'
  | 'journal'
  | 'spark'

interface MemoryArtworkOptions {
  orientation: ArtOrientation
  motif: ArtMotif
  paletteIndex: number
}

interface Palette {
  backgroundA: string
  backgroundB: string
  blob: string
  surface: string
  ink: string
  accent: string
  accentSoft: string
}

const PALETTES: Palette[] = [
  {
    backgroundA: '#fff6f1',
    backgroundB: '#ffe3ea',
    blob: '#ffd3df',
    surface: '#fffdfb',
    ink: '#77535d',
    accent: '#d97895',
    accentSoft: '#f6b4c7',
  },
  {
    backgroundA: '#fff7ee',
    backgroundB: '#ffe8cd',
    blob: '#ffdcb7',
    surface: '#fffdf8',
    ink: '#7b5e4d',
    accent: '#e7a360',
    accentSoft: '#f5c898',
  },
  {
    backgroundA: '#f7fbff',
    backgroundB: '#e7f1ff',
    blob: '#d6e7ff',
    surface: '#ffffff',
    ink: '#55657f',
    accent: '#7c9fdd',
    accentSoft: '#b6cdf9',
  },
  {
    backgroundA: '#fbf8ff',
    backgroundB: '#f0e7ff',
    blob: '#e4d4ff',
    surface: '#ffffff',
    ink: '#65567b',
    accent: '#a487d8',
    accentSoft: '#d0bef5',
  },
]

const FALLBACK_PALETTE: Palette = {
  backgroundA: '#fff6f1',
  backgroundB: '#ffe3ea',
  blob: '#ffd3df',
  surface: '#fffdfb',
  ink: '#77535d',
  accent: '#d97895',
  accentSoft: '#f6b4c7',
}

const SIZE_MAP: Record<ArtOrientation, { width: number; height: number }> = {
  wide: { width: 1600, height: 980 },
  tall: { width: 980, height: 1380 },
  square: { width: 1200, height: 1200 },
}

function renderMotif(
  motif: ArtMotif,
  width: number,
  height: number,
  palette: Palette,
): string {
  const centerX = width / 2
  const centerY = height / 2
  const iconSize = Math.min(width, height) * 0.18
  const left = centerX - iconSize
  const right = centerX + iconSize
  const top = centerY - iconSize
  const bottom = centerY + iconSize

  switch (motif) {
    case 'letter':
      return `
        <rect x="${centerX - 160}" y="${centerY - 105}" width="320" height="210" rx="28" fill="${palette.surface}" stroke="${palette.accent}" stroke-width="12"/>
        <path d="M${centerX - 160} ${centerY - 70} L${centerX} ${centerY + 20} L${centerX + 160} ${centerY - 70}" fill="none" stroke="${palette.accent}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M${centerX - 100} ${centerY - 30} C${centerX - 74} ${centerY - 72}, ${centerX - 18} ${centerY - 54}, ${centerX} ${centerY - 10} C${centerX + 18} ${centerY - 54}, ${centerX + 74} ${centerY - 72}, ${centerX + 100} ${centerY - 30} C${centerX + 92} ${centerY + 38}, ${centerX + 24} ${centerY + 62}, ${centerX} ${centerY + 96} C${centerX - 24} ${centerY + 62}, ${centerX - 92} ${centerY + 38}, ${centerX - 100} ${centerY - 30}" fill="${palette.accentSoft}" opacity="0.85"/>
      `
    case 'camera':
      return `
        <rect x="${centerX - 190}" y="${centerY - 110}" width="380" height="220" rx="38" fill="${palette.surface}" stroke="${palette.ink}" stroke-width="12"/>
        <rect x="${centerX - 120}" y="${centerY - 150}" width="130" height="58" rx="20" fill="${palette.accentSoft}" stroke="${palette.ink}" stroke-width="10"/>
        <circle cx="${centerX}" cy="${centerY}" r="72" fill="${palette.backgroundB}" stroke="${palette.ink}" stroke-width="12"/>
        <circle cx="${centerX}" cy="${centerY}" r="28" fill="${palette.accent}" opacity="0.9"/>
        <circle cx="${centerX + 122}" cy="${centerY - 40}" r="18" fill="${palette.accentSoft}"/>
      `
    case 'music':
      return `
        <circle cx="${centerX}" cy="${centerY}" r="132" fill="${palette.surface}" stroke="${palette.accent}" stroke-width="12"/>
        <circle cx="${centerX}" cy="${centerY}" r="26" fill="${palette.accentSoft}"/>
        <path d="M${centerX + 24} ${centerY - 112} V${centerY + 22} C${centerX + 24} ${centerY + 80}, ${centerX - 26} ${centerY + 104}, ${centerX - 58} ${centerY + 80} C${centerX - 92} ${centerY + 56}, ${centerX - 76} ${centerY + 12}, ${centerX - 32} ${centerY + 10} C${centerX - 2} ${centerY + 8}, ${centerX + 18} ${centerY + 18}, ${centerX + 24} ${centerY + 22}" fill="none" stroke="${palette.ink}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M${centerX + 24} ${centerY - 88} L${centerX + 126} ${centerY - 112} V${centerY + 12}" fill="none" stroke="${palette.ink}" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="${centerX + 126}" cy="${centerY + 24}" r="34" fill="${palette.accentSoft}" stroke="${palette.ink}" stroke-width="12"/>
      `
    case 'route':
      return `
        <path d="M${left - 36} ${bottom - 16} C${centerX - 120} ${centerY + 66}, ${centerX - 46} ${centerY - 96}, ${centerX + 26} ${centerY - 26} C${centerX + 96} ${centerY + 42}, ${centerX + 152} ${centerY - 34}, ${right + 28} ${top + 54}" fill="none" stroke="${palette.accent}" stroke-width="14" stroke-linecap="round" stroke-dasharray="10 16"/>
        <circle cx="${left - 38}" cy="${bottom - 18}" r="26" fill="${palette.surface}" stroke="${palette.ink}" stroke-width="10"/>
        <path d="M${centerX + 148} ${top + 18} C${centerX + 148} ${top - 34}, ${centerX + 90} ${top - 42}, ${centerX + 90} ${top + 18} C${centerX + 90} ${top + 74}, ${centerX + 120} ${top + 106}, ${centerX + 120} ${top + 106} C${centerX + 120} ${top + 106}, ${centerX + 148} ${top + 76}, ${centerX + 148} ${top + 18}" fill="${palette.accentSoft}" stroke="${palette.ink}" stroke-width="10"/>
        <circle cx="${centerX + 120}" cy="${top + 20}" r="18" fill="${palette.surface}"/>
      `
    case 'cake':
      return `
        <rect x="${centerX - 150}" y="${centerY - 24}" width="300" height="150" rx="28" fill="${palette.surface}" stroke="${palette.ink}" stroke-width="12"/>
        <path d="M${centerX - 150} ${centerY + 26} C${centerX - 88} ${centerY - 14}, ${centerX - 38} ${centerY + 58}, ${centerX + 22} ${centerY + 18} C${centerX + 72} ${centerY - 18}, ${centerX + 108} ${centerY + 56}, ${centerX + 150} ${centerY + 18}" fill="${palette.accentSoft}" opacity="0.95"/>
        <rect x="${centerX - 104}" y="${centerY - 118}" width="24" height="84" rx="12" fill="${palette.accent}"/>
        <rect x="${centerX - 12}" y="${centerY - 134}" width="24" height="100" rx="12" fill="${palette.accent}"/>
        <rect x="${centerX + 80}" y="${centerY - 118}" width="24" height="84" rx="12" fill="${palette.accent}"/>
        <path d="M${centerX - 92} ${centerY - 142} C${centerX - 106} ${centerY - 166}, ${centerX - 76} ${centerY - 176}, ${centerX - 72} ${centerY - 148} C${centerX - 70} ${centerY - 128}, ${centerX - 86} ${centerY - 124}, ${centerX - 92} ${centerY - 142}" fill="${palette.accentSoft}"/>
        <path d="M${centerX} ${centerY - 158} C${centerX - 14} ${centerY - 182}, ${centerX + 16} ${centerY - 192}, ${centerX + 20} ${centerY - 164} C${centerX + 22} ${centerY - 144}, ${centerX + 6} ${centerY - 140}, ${centerX} ${centerY - 158}" fill="${palette.accentSoft}"/>
        <path d="M${centerX + 92} ${centerY - 142} C${centerX + 78} ${centerY - 166}, ${centerX + 108} ${centerY - 176}, ${centerX + 112} ${centerY - 148} C${centerX + 114} ${centerY - 128}, ${centerX + 98} ${centerY - 124}, ${centerX + 92} ${centerY - 142}" fill="${palette.accentSoft}"/>
      `
    case 'flower':
      return `
        <circle cx="${centerX}" cy="${centerY}" r="34" fill="${palette.accent}" opacity="0.95"/>
        <circle cx="${centerX - 74}" cy="${centerY}" r="56" fill="${palette.surface}" stroke="${palette.accent}" stroke-width="10"/>
        <circle cx="${centerX + 74}" cy="${centerY}" r="56" fill="${palette.surface}" stroke="${palette.accent}" stroke-width="10"/>
        <circle cx="${centerX}" cy="${centerY - 74}" r="56" fill="${palette.surface}" stroke="${palette.accent}" stroke-width="10"/>
        <circle cx="${centerX}" cy="${centerY + 74}" r="56" fill="${palette.surface}" stroke="${palette.accent}" stroke-width="10"/>
        <path d="M${centerX} ${centerY + 110} C${centerX + 24} ${centerY + 186}, ${centerX + 8} ${centerY + 220}, ${centerX - 12} ${centerY + 260}" fill="none" stroke="${palette.ink}" stroke-width="10" stroke-linecap="round"/>
        <path d="M${centerX - 4} ${centerY + 174} C${centerX - 72} ${centerY + 140}, ${centerX - 78} ${centerY + 232}, ${centerX - 2} ${centerY + 212}" fill="${palette.accentSoft}" opacity="0.8"/>
      `
    case 'moon':
      return `
        <circle cx="${centerX}" cy="${centerY}" r="104" fill="${palette.surface}" opacity="0.95"/>
        <circle cx="${centerX + 42}" cy="${centerY - 18}" r="98" fill="${palette.backgroundB}"/>
        <circle cx="${centerX - 146}" cy="${centerY - 94}" r="16" fill="${palette.accentSoft}"/>
        <circle cx="${centerX + 154}" cy="${centerY - 64}" r="12" fill="${palette.accentSoft}"/>
        <path d="M${centerX - 98} ${centerY + 102} C${centerX - 12} ${centerY + 72}, ${centerX + 74} ${centerY + 92}, ${centerX + 164} ${centerY + 56}" fill="none" stroke="${palette.accent}" stroke-width="12" stroke-linecap="round"/>
      `
    case 'coffee':
      return `
        <rect x="${centerX - 136}" y="${centerY - 42}" width="272" height="156" rx="32" fill="${palette.surface}" stroke="${palette.ink}" stroke-width="12"/>
        <path d="M${centerX + 136} ${centerY - 6} C${centerX + 206} ${centerY - 14}, ${centerX + 210} ${centerY + 88}, ${centerX + 128} ${centerY + 84}" fill="none" stroke="${palette.ink}" stroke-width="12" stroke-linecap="round"/>
        <path d="M${centerX - 44} ${centerY - 114} C${centerX - 72} ${centerY - 150}, ${centerX - 22} ${centerY - 182}, ${centerX - 8} ${centerY - 136}" fill="none" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round"/>
        <path d="M${centerX + 22} ${centerY - 122} C${centerX - 6} ${centerY - 154}, ${centerX + 48} ${centerY - 190}, ${centerX + 58} ${centerY - 138}" fill="none" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round"/>
        <path d="M${centerX - 40} ${centerY + 30} C${centerX - 10} ${centerY - 10}, ${centerX + 34} ${centerY - 8}, ${centerX + 56} ${centerY + 28} C${centerX + 44} ${centerY + 72}, ${centerX - 14} ${centerY + 92}, ${centerX - 40} ${centerY + 30}" fill="${palette.accentSoft}" opacity="0.88"/>
      `
    case 'ticket':
      return `
        <path d="M${centerX - 214} ${centerY - 102} H${centerX + 214} V${centerY - 36} C${centerX + 174} ${centerY - 26}, ${centerX + 174} ${centerY + 26}, ${centerX + 214} ${centerY + 34} V${centerY + 102} H${centerX - 214} V${centerY + 34} C${centerX - 174} ${centerY + 24}, ${centerX - 174} ${centerY - 24}, ${centerX - 214} ${centerY - 36} Z" fill="${palette.surface}" stroke="${palette.ink}" stroke-width="12"/>
        <path d="M${centerX - 54} ${centerY - 102} V${centerY + 102}" stroke="${palette.accent}" stroke-width="10" stroke-dasharray="14 18" stroke-linecap="round"/>
        <circle cx="${centerX + 96}" cy="${centerY}" r="42" fill="${palette.accentSoft}" opacity="0.85"/>
        <path d="M${centerX + 96} ${centerY - 28} C${centerX + 74} ${centerY - 58}, ${centerX + 24} ${centerY - 42}, ${centerX + 24} ${centerY - 4} C${centerX + 24} ${centerY + 50}, ${centerX + 96} ${centerY + 80}, ${centerX + 96} ${centerY + 80} C${centerX + 96} ${centerY + 80}, ${centerX + 168} ${centerY + 50}, ${centerX + 168} ${centerY - 4} C${centerX + 168} ${centerY - 42}, ${centerX + 118} ${centerY - 58}, ${centerX + 96} ${centerY - 28}" fill="${palette.surface}" opacity="0.92"/>
      `
    case 'balloon':
      return `
        <path d="M${centerX - 72} ${centerY - 66} C${centerX - 126} ${centerY - 136}, ${centerX - 40} ${centerY - 210}, ${centerX + 6} ${centerY - 150} C${centerX + 50} ${centerY - 214}, ${centerX + 140} ${centerY - 138}, ${centerX + 88} ${centerY - 58} C${centerX + 40} ${centerY + 12}, ${centerX - 28} ${centerY + 18}, ${centerX - 72} ${centerY - 66}" fill="${palette.accentSoft}" opacity="0.9"/>
        <path d="M${centerX - 42} ${centerY + 18} C${centerX - 26} ${centerY + 94}, ${centerX - 10} ${centerY + 154}, ${centerX + 24} ${centerY + 238}" fill="none" stroke="${palette.ink}" stroke-width="10" stroke-linecap="round"/>
        <path d="M${centerX + 88} ${centerY - 58} C${centerX + 110} ${centerY + 20}, ${centerX + 118} ${centerY + 110}, ${centerX + 100} ${centerY + 214}" fill="none" stroke="${palette.ink}" stroke-width="10" stroke-linecap="round"/>
      `
    case 'journal':
      return `
        <rect x="${centerX - 182}" y="${centerY - 132}" width="364" height="264" rx="34" fill="${palette.surface}" stroke="${palette.ink}" stroke-width="12"/>
        <path d="M${centerX} ${centerY - 132} V${centerY + 132}" stroke="${palette.accent}" stroke-width="12"/>
        <path d="M${centerX - 130} ${centerY - 64} H${centerX - 36}" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round"/>
        <path d="M${centerX - 130} ${centerY - 12} H${centerX - 48}" stroke="${palette.accent}" stroke-width="10" stroke-linecap="round"/>
        <path d="M${centerX + 42} ${centerY - 18} C${centerX + 20} ${centerY - 52}, ${centerX - 30} ${centerY - 38}, ${centerX - 30} ${centerY - 2} C${centerX - 30} ${centerY + 46}, ${centerX + 42} ${centerY + 70}, ${centerX + 42} ${centerY + 70} C${centerX + 42} ${centerY + 70}, ${centerX + 114} ${centerY + 46}, ${centerX + 114} ${centerY - 2} C${centerX + 114} ${centerY - 38}, ${centerX + 64} ${centerY - 52}, ${centerX + 42} ${centerY - 18}" fill="${palette.accentSoft}" opacity="0.9"/>
      `
    case 'spark':
      return `
        <path d="M${centerX - 18} ${top - 12} L${centerX + 10} ${centerY - 24} L${centerX + 72} ${centerY - 32} L${centerX + 24} ${centerY + 6} L${centerX + 36} ${bottom + 16} L${centerX - 18} ${centerY + 28} L${centerX - 94} ${centerY + 40} L${centerX - 42} ${centerY - 6} Z" fill="${palette.accentSoft}" opacity="0.92"/>
        <circle cx="${centerX - 152}" cy="${centerY - 68}" r="18" fill="${palette.accent}"/>
        <circle cx="${centerX + 162}" cy="${centerY + 42}" r="14" fill="${palette.accent}"/>
        <circle cx="${centerX - 104}" cy="${centerY + 132}" r="12" fill="${palette.accentSoft}"/>
      `
  }
}

export function createMemoryArtwork(options: MemoryArtworkOptions): string {
  const { width, height } = SIZE_MAP[options.orientation]
  const palette = PALETTES[options.paletteIndex % PALETTES.length] ?? FALLBACK_PALETTE
  const radius = Math.round(Math.min(width, height) * 0.07)
  const cardX = width * 0.16
  const cardY = height * 0.12
  const cardWidth = width * 0.68
  const cardHeight = height * 0.68
  const backCardX = width * 0.23
  const backCardY = height * 0.18
  const backCardWidth = width * 0.54
  const backCardHeight = height * 0.58

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="${width}" y2="${height}" gradientUnits="userSpaceOnUse">
          <stop stop-color="${palette.backgroundA}"/>
          <stop offset="1" stop-color="${palette.backgroundB}"/>
        </linearGradient>
        <linearGradient id="surface" x1="${cardX}" y1="${cardY}" x2="${cardX}" y2="${cardY + cardHeight}" gradientUnits="userSpaceOnUse">
          <stop stop-color="${palette.surface}" stop-opacity="0.98"/>
          <stop offset="1" stop-color="${palette.surface}" stop-opacity="0.84"/>
        </linearGradient>
        <filter id="shadow" x="0" y="0" width="${width}" height="${height}" color-interpolation-filters="sRGB">
          <feDropShadow dx="0" dy="34" stdDeviation="36" flood-color="${palette.accent}" flood-opacity="0.16"/>
        </filter>
      </defs>

      <rect width="${width}" height="${height}" rx="${radius}" fill="url(#bg)"/>
      <circle cx="${width * 0.18}" cy="${height * 0.2}" r="${Math.min(width, height) * 0.18}" fill="${palette.blob}" opacity="0.5"/>
      <circle cx="${width * 0.86}" cy="${height * 0.14}" r="${Math.min(width, height) * 0.12}" fill="${palette.accentSoft}" opacity="0.45"/>
      <circle cx="${width * 0.82}" cy="${height * 0.82}" r="${Math.min(width, height) * 0.22}" fill="${palette.blob}" opacity="0.26"/>

      <g opacity="0.7">
        <circle cx="${width * 0.14}" cy="${height * 0.78}" r="10" fill="${palette.accent}"/>
        <circle cx="${width * 0.18}" cy="${height * 0.84}" r="6" fill="${palette.accentSoft}"/>
        <circle cx="${width * 0.78}" cy="${height * 0.18}" r="8" fill="${palette.accent}"/>
      </g>

      <rect x="${backCardX}" y="${backCardY}" width="${backCardWidth}" height="${backCardHeight}" rx="${radius * 0.86}" fill="${palette.surface}" opacity="0.42" transform="rotate(-7 ${width / 2} ${height / 2})"/>

      <g filter="url(#shadow)">
        <rect x="${cardX}" y="${cardY}" width="${cardWidth}" height="${cardHeight}" rx="${radius}" fill="url(#surface)" stroke="${palette.surface}" stroke-width="4" transform="rotate(4 ${width / 2} ${height / 2})"/>
      </g>

      <rect x="${cardX + 52}" y="${cardY + 30}" width="${cardWidth - 104}" height="${cardHeight - 60}" rx="${radius * 0.8}" fill="${palette.surface}" opacity="0.92" transform="rotate(4 ${width / 2} ${height / 2})"/>

      <g transform="rotate(4 ${width / 2} ${height / 2})">
        <rect x="${cardX + cardWidth - 164}" y="${cardY - 6}" width="112" height="42" rx="16" fill="${palette.accentSoft}" opacity="0.9"/>
        <rect x="${cardX + 42}" y="${cardY - 2}" width="96" height="34" rx="14" fill="${palette.blob}" opacity="0.8"/>
        ${renderMotif(options.motif, width, height, palette)}
      </g>

      <path d="M${width * 0.14} ${height * 0.72} C${width * 0.3} ${height * 0.8}, ${width * 0.62} ${height * 0.9}, ${width * 0.86} ${height * 0.76}" stroke="${palette.surface}" stroke-opacity="0.7" stroke-width="10" stroke-linecap="round"/>
    </svg>
  `

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`
}

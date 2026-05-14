import { createMemoryArtwork } from './safeArtwork'

export const galleryImageAssets = [
  createMemoryArtwork({ orientation: 'wide', motif: 'route', paletteIndex: 0 }),
  createMemoryArtwork({ orientation: 'square', motif: 'coffee', paletteIndex: 1 }),
  createMemoryArtwork({ orientation: 'tall', motif: 'cake', paletteIndex: 0 }),
  createMemoryArtwork({ orientation: 'square', motif: 'spark', paletteIndex: 3 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'balloon', paletteIndex: 1 }),
  createMemoryArtwork({ orientation: 'square', motif: 'flower', paletteIndex: 2 }),
  createMemoryArtwork({ orientation: 'tall', motif: 'camera', paletteIndex: 2 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'moon', paletteIndex: 3 }),
] as const

export const storyImageAssets = [
  createMemoryArtwork({ orientation: 'wide', motif: 'letter', paletteIndex: 0 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'spark', paletteIndex: 3 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'ticket', paletteIndex: 1 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'journal', paletteIndex: 2 }),
] as const

export const journeyImageAssets = [
  createMemoryArtwork({ orientation: 'wide', motif: 'moon', paletteIndex: 0 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'camera', paletteIndex: 2 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'coffee', paletteIndex: 1 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'balloon', paletteIndex: 0 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'flower', paletteIndex: 3 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'ticket', paletteIndex: 1 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'route', paletteIndex: 2 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'journal', paletteIndex: 0 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'letter', paletteIndex: 3 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'music', paletteIndex: 2 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'cake', paletteIndex: 1 }),
  createMemoryArtwork({ orientation: 'wide', motif: 'spark', paletteIndex: 0 }),
] as const

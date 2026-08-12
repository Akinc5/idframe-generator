import * as htmlToImage from 'html-to-image';
import type { TeamMember } from './types';

export const generateFrameCanvas = async (_members: TeamMember[]): Promise<HTMLCanvasElement> => {
  const node = document.getElementById('frame-preview-node');
  if (!node) throw new Error('Preview node not found — make sure the card is visible first.');

  // Temporarily reset the scale transform so html-to-image captures at true 1100x560 resolution
  const parent = node.parentElement;
  const originalTransform = parent?.style.transform || '';
  if (parent) parent.style.transform = 'scale(1)';

  // Small delay to let the DOM update
  await new Promise(r => setTimeout(r, 100));

  try {
    const canvas = await htmlToImage.toCanvas(node, {
      width: 1100,
      height: 560,
      pixelRatio: 2, // 2x for sharp output = 2200x1120
      cacheBust: true,
      skipFonts: false,
      style: {
        transform: 'none',
        borderRadius: '32px',
      },
      filter: (el: Element) => {
        // Skip any elements that might cause CORS issues
        if (el.tagName === 'SCRIPT') return false;
        return true;
      },
    });
    return canvas;
  } finally {
    // Restore the scale transform
    if (parent) parent.style.transform = originalTransform;
  }
};

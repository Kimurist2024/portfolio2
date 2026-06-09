/**
 * One shared scroll-reveal so every section animates on the same curve and
 * two durations — and is correctly gated for `prefers-reduced-motion`.
 *
 * When reduced motion is requested we keep the opacity fade (so nothing stays
 * stuck at opacity:0) but drop all positional offset and shorten the duration.
 */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export interface RevealOptions {
  y?: number;
  x?: number;
  duration?: number;
  delay?: number;
}

export function revealProps(reduce: boolean | null, opts: RevealOptions = {}) {
  const { y = 24, x = 0, duration = 0.55, delay = 0 } = opts;
  return {
    initial: reduce ? { opacity: 0 } : { opacity: 0, x, y },
    whileInView: { opacity: 1, x: 0, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: {
      duration: reduce ? 0.2 : duration,
      delay: reduce ? 0 : delay,
      ease: EASE,
    },
  } as const;
}

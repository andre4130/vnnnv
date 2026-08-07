'use client';

import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { getHeaderImagesForPath, pickRandom } from '@/lib/headerImages';
import { useMediaQuery } from '@mui/material';

const FADE_MS = 500;

const navItems = [
  { label: 'Product', href: '/product' },
  { label: 'Visual', href: '/visual' },
  { label: 'About', href: '/about' },
] as const;

type HeaderProps = {
  images: {
    mobile: readonly string[];
    desktop: readonly string[];
  };
};

function pickNextBackground(
  pathname: string,
  images: readonly string[],
  current: string | null
): string | null {
  const pool = getHeaderImagesForPath(pathname, images);
  if (pool.length === 0) {
    return null;
  }

  if (current && pool.length > 1) {
    const alternatives = pool.filter((src) => src !== current);
    return pickRandom(alternatives.length > 0 ? alternatives : pool);
  }

  return pickRandom(pool);
}

export default function Header({ images: { mobile, desktop } }: HeaderProps) {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 600px)');
  const [baseSrc, setBaseSrc] = useState<string | null>(null);
  const [overlaySrc, setOverlaySrc] = useState<string | null>(null);
  const [overlayOpaque, setOverlayOpaque] = useState(false);
  const baseSrcRef = useRef<string | null>(null);
  const pendingPathRef = useRef<string | null>(null);
  const pendingSrcRef = useRef<string | null>(null);

  const images = isMobile ? mobile : desktop;

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    let next: string | null = null;

    if (pendingPathRef.current === pathname && pendingSrcRef.current) {
      next = pendingSrcRef.current;
    } else {
      next = pickNextBackground(pathname, images, baseSrcRef.current);
      pendingPathRef.current = pathname;
      pendingSrcRef.current = next;
    }

    if (!next) {
      return;
    }

    // First paint — no fade needed.
    if (!baseSrcRef.current) {
      baseSrcRef.current = next;
      setBaseSrc(next);
      return;
    }

    if (next === baseSrcRef.current) {
      return;
    }

    let cancelled = false;

    setOverlaySrc(next);
    setOverlayOpaque(false);

    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        if (!cancelled) {
          setOverlayOpaque(true);
        }
      });
    });

    const timeout = window.setTimeout(() => {
      if (cancelled) {
        return;
      }
      baseSrcRef.current = next;
      setBaseSrc(next);
      setOverlaySrc(null);
      setOverlayOpaque(false);
    }, FADE_MS);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      window.clearTimeout(timeout);
      setOverlaySrc(null);
      setOverlayOpaque(false);
    };
  }, [pathname, images]);

  return (
    <Box
      component='header'
      sx={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        overflow: 'hidden',
        bgcolor: '#000',
      }}
    >
      {baseSrc ? (
        <Image
          src={baseSrc}
          alt=''
          fill
          priority
          sizes='100vw'
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      ) : null}

      {overlaySrc ? (
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            opacity: overlayOpaque ? 1 : 0,
            transition: `opacity ${FADE_MS}ms ease-in-out`,
            pointerEvents: 'none',
          }}
        >
          <Image
            src={overlaySrc}
            alt=''
            fill
            sizes='100vw'
            style={{ objectFit: 'cover', objectPosition: 'center' }}
          />
        </Box>
      ) : null}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          bgcolor: 'rgba(0, 0, 0, 0.1)',
          pointerEvents: 'none',
        }}
      />

      <Box
        sx={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 2,
        }}
      >
        <Box
          sx={{
            width: 'min(72vw, 520px)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            gap: { xs: 2, md: 2.5 },
          }}
        >
          <Box
            component={Link}
            href='/'
            scroll={false}
            aria-label='vnnnv home'
            sx={{
              display: 'block',
              lineHeight: 0,
              textDecoration: 'none',
            }}
          >
            <Box
              component='img'
              src='/images/logo/vnnnv.svg'
              alt='vnnnv'
              sx={{
                width: '100%',
                height: 'auto',
                display: 'block',
              }}
            />
          </Box>

          <Box
            component='nav'
            aria-label='Primary'
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr auto 1fr',
              alignItems: 'center',
              width: '100%',
              fontFamily: 'var(--font-lato), Helvetica, Arial, sans-serif',
            }}
          >
            {navItems.map((item, index) => {
              const isActive = pathname.startsWith(item.href);
              const justifySelf =
                index === 0
                  ? 'start'
                  : index === navItems.length - 1
                  ? 'end'
                  : 'center';

              return (
                <Box key={item.href} sx={{ display: 'contents' }}>
                  {index > 0 ? (
                    <Box
                      component='span'
                      aria-hidden
                      sx={{
                        color: '#fff',
                        px: { xs: 0.5, sm: 1 },
                        fontSize: { xs: '0.7rem', sm: '0.8rem' },
                        letterSpacing: '0.12em',
                        userSelect: 'none',
                        textAlign: 'center',
                      }}
                    >
                      ·
                    </Box>
                  ) : null}
                  <Box
                    component={Link}
                    href={item.href}
                    scroll={false}
                    sx={{
                      justifySelf,
                      color: '#fff',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      fontWeight: isActive ? 700 : 400,
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.875rem' },
                      letterSpacing: '0.18em',
                      opacity: isActive ? 1 : 0.9,
                      whiteSpace: 'nowrap',
                      '&:hover': { opacity: 1 },
                    }}
                  >
                    {item.label}
                  </Box>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

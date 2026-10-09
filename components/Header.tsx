'use client';

import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const FADE_MS = 500;

const navItems = [
  { label: 'Visual', href: '/visual' },
  { label: 'Product', href: '/product' },
  { label: 'About', href: '/about' },
] as const;

type HeaderProps = {
  backgroundSrc: string | null;
};

export default function Header({ backgroundSrc }: HeaderProps) {
  const pathname = usePathname();
  const [baseSrc, setBaseSrc] = useState<string | null>(null);
  const [overlaySrc, setOverlaySrc] = useState<string | null>(null);
  const [overlayOpaque, setOverlayOpaque] = useState(false);
  const baseSrcRef = useRef<string | null>(null);

  useEffect(() => {
    if (!backgroundSrc) {
      return;
    }

    // First paint — no fade needed.
    if (!baseSrcRef.current) {
      baseSrcRef.current = backgroundSrc;
      setBaseSrc(backgroundSrc);
      return;
    }

    if (backgroundSrc === baseSrcRef.current) {
      return;
    }

    let cancelled = false;

    setOverlaySrc(backgroundSrc);
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
      baseSrcRef.current = backgroundSrc;
      setBaseSrc(backgroundSrc);
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
  }, [backgroundSrc]);

  return (
    <Box
      component='header'
      sx={{
        position: 'relative',
        width: '100%',
        height: '99vh',
        overflow: 'hidden',
        bgcolor: '#000',
        transition: 'height 0.3s ease-in-out',
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
            justifyContent: 'center',
            gap: { xs: 1, md: 1 },
          }}
        >
          <Box
            component={Link}
            href='/visual'
            aria-label='vnnnv'
            sx={{
              position: 'relative',
              display: 'block',
              lineHeight: 0,
              textDecoration: 'none',
              outline: 'none',
              '&:focus-visible::after': {
                content: '""',
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                height: '2px',
                bgcolor: '#fff',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
              },
            }}
          >
            <Box
              component='img'
              src='/images/logo/vnnnv.svg'
              alt='vnnnv'
              sx={{
                width: '100%',
                maxWidth: '520px',
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
              alignSelf: 'center',
              width: '64%',
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
                    sx={{
                      justifySelf,
                      color: '#fff',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      fontWeight: isActive ? 700 : 400,
                      fontSize: { xs: '0.7rem', sm: '0.8rem', md: '0.85rem' },
                      letterSpacing: '0.48em',
                      opacity: isActive ? 1 : 0.9,
                      whiteSpace: 'nowrap',
                      outline: 'none',
                      '&:hover': {
                        opacity: 1,
                        textDecoration: 'line-through',
                      },
                      '&:focus-visible': {
                        textDecoration: 'line-through',
                      },
                    }}
                  >
                    {item.label}
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box
            component='img'
            src='/images/header_and_footer/TRIANGULO.png'
            alt=''
            aria-hidden
            sx={{
              width: { xs: 36, sm: 48, md: 64 },
              height: 'auto',
              display: 'block',
              alignSelf: 'center',
              mt: { xs: 0.5, md: 0.75 },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}

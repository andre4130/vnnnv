'use client';

import Box from '@mui/material/Box';
import Image from 'next/image';

const textSx = {
  color: '#fff',
  fontFamily: 'var(--font-lato), Helvetica, Arial, sans-serif',
  fontSize: { xs: '0.45rem', sm: '0.6rem', md: '0.65rem' },
  letterSpacing: '0.6em',
  lineHeight: 2.2,
  m: 0,
} as const;

const linkSx = {
  ...textSx,
  textDecoration: 'none',
  display: 'block',
  '&:hover': { opacity: 0.85 },
} as const;

type FooterProps = {
  backgroundSrc: string | null;
};

let scrollFrame = 0;

function setScrollTop(value: number) {
  document.documentElement.scrollTop = value;
  document.body.scrollTop = value;
}

function scrollToTop() {
  cancelAnimationFrame(scrollFrame);

  const start = window.scrollY || document.documentElement.scrollTop;
  if (start <= 0) {
    return;
  }

  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  const root = document.documentElement;
  const previousBehavior = root.style.scrollBehavior;
  // Keep each frame instant. The page's own smooth-scroll setting
  // otherwise swallows the steps and the jump looks abrupt.
  root.style.scrollBehavior = 'auto';

  if (reduceMotion) {
    setScrollTop(0);
    root.style.scrollBehavior = previousBehavior;
    return;
  }

  const duration = Math.min(1400, Math.max(700, start / 12));
  const startTime = performance.now();

  const step = (now: number) => {
    const progress = Math.min(1, (now - startTime) / duration);
    const eased = 1 - (1 - progress) ** 3;
    setScrollTop(Math.round(start * (1 - eased)));
    if (progress < 1) {
      scrollFrame = requestAnimationFrame(step);
      return;
    }
    root.style.scrollBehavior = previousBehavior;
  };

  scrollFrame = requestAnimationFrame(step);
}

export default function Footer({ backgroundSrc }: FooterProps) {
  return (
    <Box
      component='footer'
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 200, sm: 220 },
        minHeight: { xs: 200, sm: 220 },
        overflow: 'hidden',
        bgcolor: '#000',
        mt: 'auto',
        flexShrink: 0,
      }}
    >
      {backgroundSrc ? (
        <Image
          src={backgroundSrc}
          alt=''
          fill
          sizes='100vw'
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
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
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: { xs: 'center', sm: 'space-between' },
          px: { xs: 2, sm: 4, md: 6 },
          py: { xs: 2.5, sm: 0 },
          gap: { xs: 1.5, sm: 2 },
        }}
      >
        <Box
          sx={{
            flex: { xs: 'none', sm: 1 },
            textTransform: 'uppercase',
            textAlign: { xs: 'center', sm: 'left' },
          }}
        >
          <Box component='p' sx={textSx}>
            NOE LAMAS
          </Box>
          <Box
            component='p'
            sx={{ ...textSx, display: { xs: 'block', sm: 'none' } }}
          >
            Photo, Video, Creative Direction
          </Box>
          <Box
            component='p'
            sx={{ ...textSx, display: { xs: 'none', sm: 'block' } }}
          >
            Photo, Video
          </Box>
          <Box
            component='p'
            sx={{ ...textSx, display: { xs: 'none', sm: 'block' } }}
          >
            Creative Direction
          </Box>
        </Box>

        <Box
          component='button'
          type='button'
          aria-label='Back to top'
          onClick={scrollToTop}
          sx={{
            flexShrink: 0,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: { xs: 1, sm: 1.25 },
            p: 0,
            m: 0,
            border: 0,
            bgcolor: 'transparent',
            cursor: 'pointer',
            color: 'inherit',
            outline: 'none',
            '&:focus-visible': {
              outline: '1px solid #fff',
              outlineOffset: 6,
            },
          }}
        >
          <Box
            component='img'
            src='/images/header_and_footer/TRIANGULO.png'
            alt=''
            aria-hidden
            sx={{
              width: { xs: 16, sm: 20, md: 24 },
              height: 'auto',
              display: 'block',
              transform: 'rotate(180deg)',
              flexShrink: 0,
            }}
          />
          <Box
            component='img'
            src='/images/logo/vnnnv.svg'
            alt='vnnnv'
            sx={{
              width: { xs: 'min(42vw, 140px)', sm: 'min(28vw, 180px)' },
              height: 'auto',
              display: 'block',
              lineHeight: 0,
            }}
          />
          <Box
            component='img'
            src='/images/header_and_footer/TRIANGULO.png'
            alt=''
            aria-hidden
            sx={{
              width: { xs: 16, sm: 20, md: 24 },
              height: 'auto',
              display: 'block',
              transform: 'rotate(180deg)',
              flexShrink: 0,
            }}
          />
        </Box>

        <Box
          sx={{
            flex: { xs: 'none', sm: 1 },
            display: 'flex',
            flexDirection: { xs: 'row', sm: 'column' },
            flexWrap: { xs: 'wrap', sm: 'nowrap' },
            justifyContent: { xs: 'center', sm: 'flex-end' },
            alignItems: { xs: 'center', sm: 'flex-end' },
            gap: { xs: 1, sm: 0 },
            textAlign: { xs: 'center', sm: 'right' },
          }}
        >
          <Box
            component='a'
            href='tel:+34656918429'
            sx={{
              ...linkSx,
              display: { xs: 'inline', sm: 'block' },
              textTransform: 'none',
            }}
          >
            +34 656 918 429
          </Box>
          <Box
            component='a'
            href='mailto:noelamasalonso@gmail.com'
            sx={{
              ...linkSx,
              display: { xs: 'inline', sm: 'block' },
              textTransform: 'uppercase',
            }}
          >
            noelamasalonso@gmail.com
          </Box>
          <Box
            component='p'
            sx={{
              ...textSx,
              display: { xs: 'inline', sm: 'block' },
              textTransform: 'none',
            }}
          >
            08019 BCN - SPAIN
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

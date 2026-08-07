'use client';

import Box from '@mui/material/Box';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { pickRandom } from '@/lib/headerImages';

const textSx = {
  color: '#fff',
  fontFamily: 'var(--font-lato), Helvetica, Arial, sans-serif',
  fontSize: { xs: '0.55rem', sm: '0.7rem', md: '0.875rem' },
  letterSpacing: '0.18em',
  lineHeight: 1.7,
  m: 0,
} as const;

const linkSx = {
  ...textSx,
  textDecoration: 'none',
  display: 'block',
  '&:hover': { opacity: 0.85 },
} as const;

type FooterProps = {
  images: readonly string[];
};

export default function Footer({ images }: FooterProps) {
  const pathname = usePathname();
  const [backgroundSrc, setBackgroundSrc] = useState<string | null>(null);
  const isHome = pathname === '/';

  useEffect(() => {
    if (isHome) {
      return;
    }
    setBackgroundSrc(pickRandom(images));
  }, [images, isHome]);

  if (isHome) {
    return null;
  }

  return (
    <Box
      component='footer'
      sx={{
        position: 'relative',
        width: '100%',
        height: { xs: 180, sm: 200 },
        minHeight: { xs: 180, sm: 200 },
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
            Noe Lamas
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
          sx={{
            flexShrink: 0,
            width: { xs: 'min(42vw, 140px)', sm: 'min(28vw, 180px)' },
            lineHeight: 0,
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
              textTransform: 'none',
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

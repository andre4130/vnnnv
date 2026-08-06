'use client';

import Box from '@mui/material/Box';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getHeaderImagesForPath, pickRandom } from '@/lib/headerImages';

const navItems = [
  { label: 'Product', href: '/product' },
  { label: 'Visual', href: '/visual' },
  { label: 'About', href: '/about' },
] as const;

type HeaderProps = {
  images: readonly string[];
};

export default function Header({ images }: HeaderProps) {
  const pathname = usePathname();
  const [backgroundSrc, setBackgroundSrc] = useState<string | null>(null);

  useEffect(() => {
    const pool = getHeaderImagesForPath(pathname, images);
    setBackgroundSrc(pickRandom(pool));
  }, [pathname, images]);

  return (
    <Box
      component='header'
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: '#000',
      }}
    >
      {backgroundSrc ? (
        <Image
          src={backgroundSrc}
          alt=''
          fill
          priority
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

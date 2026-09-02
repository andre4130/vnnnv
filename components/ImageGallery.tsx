'use client';

import Image from 'next/image';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import type { GalleryImage, GalleryRow } from '@/lib/galleryImages';

type ImageGalleryProps = {
  rows: GalleryRow[];
};

const GAP = { xs: 1, md: 2 };

function imageSizes(type: GalleryRow['type'], image: GalleryImage) {
  if (type === 'landscape') return '100vw';
  if (type === 'mixed') {
    return image.orientation === 'portrait' ? '33vw' : '66vw';
  }
  return '33vw';
}

function ChevronLeftIcon() {
  return (
    <Box
      component='svg'
      viewBox='0 0 24 24'
      aria-hidden
      sx={{ width: 28, height: 28, display: 'block' }}
    >
      <path
        fill='currentColor'
        d='M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12z'
      />
    </Box>
  );
}

function ChevronRightIcon() {
  return (
    <Box
      component='svg'
      viewBox='0 0 24 24'
      aria-hidden
      sx={{ width: 28, height: 28, display: 'block' }}
    >
      <path
        fill='currentColor'
        d='M10 6 8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'
      />
    </Box>
  );
}

function CloseIcon() {
  return (
    <Box
      component='svg'
      viewBox='0 0 24 24'
      aria-hidden
      sx={{ width: 24, height: 24, display: 'block' }}
    >
      <path
        fill='currentColor'
        d='M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z'
      />
    </Box>
  );
}

export default function ImageGallery({ rows }: ImageGalleryProps) {
  const images = useMemo(() => rows.flatMap((row) => row.images), [rows]);
  const indexBySrc = useMemo(() => {
    const map = new Map<string, number>();
    images.forEach((image, index) => map.set(image.src, index));
    return map;
  }, [images]);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const open = activeIndex !== null;
  const activeImage = activeIndex !== null ? images[activeIndex] : null;

  const close = useCallback(() => setActiveIndex(null), []);

  const showPrev = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) return current;
      return (current - 1 + images.length) % images.length;
    });
  }, [images.length]);

  const showNext = useCallback(() => {
    setActiveIndex((current) => {
      if (current === null || images.length === 0) return current;
      return (current + 1) % images.length;
    });
  }, [images.length]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showPrev();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showNext();
      } else if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, showPrev, showNext, close]);

  if (rows.length === 0) {
    return null;
  }

  return (
    <>
      <Box
        component='section'
        aria-label='Image gallery'
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: GAP,
          padding: '20px',
        }}
      >
        {rows.map((row, rowIndex) => {
          const isFirstRow = rowIndex === 0;
          const isMixed = row.type === 'mixed';
          const isLandscape = row.type === 'landscape';

          return (
            <Box
              key={`row-${rowIndex}-${row.images[0]?.src ?? rowIndex}`}
              sx={
                isMixed
                  ? {
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'stretch',
                      gap: GAP,
                      width: '100%',
                    }
                  : {
                      display: 'grid',
                      gridTemplateColumns: isLandscape
                        ? '1fr'
                        : 'repeat(3, 1fr)',
                      gap: GAP,
                      width: '100%',
                    }
              }
            >
              {row.images.map((image) => {
                const landscapeInMixed =
                  isMixed && image.orientation === 'landscape';
                const flatIndex = indexBySrc.get(image.src) ?? 0;

                return (
                  <Box
                    key={image.src}
                    component='button'
                    type='button'
                    onClick={() => setActiveIndex(flatIndex)}
                    aria-label='Open image'
                    sx={{
                      position: 'relative',
                      width: '100%',
                      overflow: 'hidden',
                      bgcolor: 'grey.100',
                      border: 0,
                      padding: 0,
                      cursor: 'pointer',
                      display: 'block',
                      color: 'inherit',
                      ...(isMixed
                        ? {
                            flex:
                              image.orientation === 'portrait'
                                ? '1 1 0'
                                : '2 1 0',
                            aspectRatio: landscapeInMixed
                              ? 'unset'
                              : `${image.width} / ${image.height}`,
                            minHeight: landscapeInMixed ? 0 : undefined,
                          }
                        : {
                            aspectRatio: `${image.width} / ${image.height}`,
                          }),
                    }}
                  >
                    <Image
                      src={image.src}
                      alt=''
                      fill
                      sizes={imageSizes(row.type, image)}
                      priority={isFirstRow}
                      style={{ objectFit: 'cover' }}
                    />
                  </Box>
                );
              })}
            </Box>
          );
        })}
      </Box>

      <Dialog
        open={open}
        onClose={close}
        fullWidth
        maxWidth={false}
        slotProps={{
          paper: {
            sx: {
              m: { xs: 1, md: 2 },
              width: 'calc(100% - 16px)',
              maxWidth: '100%',
              height: { xs: 'calc(100% - 16px)', md: 'calc(100% - 32px)' },
              maxHeight: '100%',
              bgcolor: '#111',
              borderRadius: 0,
              overflow: 'hidden',
            },
          },
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: '#111',
          }}
        >
          <IconButton
            aria-label='Close'
            onClick={close}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 2,
              color: '#fff',
              bgcolor: 'rgba(0,0,0,0.35)',
              '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
            }}
          >
            <CloseIcon />
          </IconButton>

          {images.length > 1 && (
            <>
              <IconButton
                aria-label='Previous image'
                onClick={showPrev}
                sx={{
                  position: 'absolute',
                  left: { xs: 4, md: 12 },
                  zIndex: 2,
                  color: '#fff',
                  bgcolor: 'rgba(0,0,0,0.35)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                aria-label='Next image'
                onClick={showNext}
                sx={{
                  position: 'absolute',
                  right: { xs: 4, md: 12 },
                  zIndex: 2,
                  color: '#fff',
                  bgcolor: 'rgba(0,0,0,0.35)',
                  '&:hover': { bgcolor: 'rgba(0,0,0,0.55)' },
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}

          {activeImage && (
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: '100%',
                px: { xs: 5, md: 8 },
                py: { xs: 6, md: 4 },
              }}
            >
              <Image
                src={activeImage.src}
                alt=''
                fill
                sizes='100vw'
                priority
                style={{ objectFit: 'contain' }}
              />
            </Box>
          )}

          {activeIndex !== null && images.length > 0 && (
            <Box
              component='span'
              sx={{
                position: 'absolute',
                bottom: 12,
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.8)',
                fontSize: 13,
                letterSpacing: '0.04em',
                userSelect: 'none',
              }}
            >
              {activeIndex + 1} / {images.length}
            </Box>
          )}
        </Box>
      </Dialog>
    </>
  );
}

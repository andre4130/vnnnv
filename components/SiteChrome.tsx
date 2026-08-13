'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { pickNextBackground } from '@/lib/headerImages';

type SiteChromeProps = {
  images: readonly string[];
  children: ReactNode;
};

export default function SiteChrome({ images, children }: SiteChromeProps) {
  const pathname = usePathname();
  const [backgroundSrc, setBackgroundSrc] = useState<string | null>(null);
  const backgroundSrcRef = useRef<string | null>(null);
  const pendingPathRef = useRef<string | null>(null);
  const pendingSrcRef = useRef<string | null>(null);

  useEffect(() => {
    let next: string | null = null;

    if (pendingPathRef.current === pathname && pendingSrcRef.current) {
      next = pendingSrcRef.current;
    } else {
      next = pickNextBackground(pathname, images, backgroundSrcRef.current);
      pendingPathRef.current = pathname;
      pendingSrcRef.current = next;
    }

    backgroundSrcRef.current = next;
    setBackgroundSrc(next);
  }, [pathname, images]);

  return (
    <>
      <Header backgroundSrc={backgroundSrc} />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer backgroundSrc={backgroundSrc} />
    </>
  );
}

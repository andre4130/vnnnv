import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import SiteChrome from '@/components/SiteChrome';
import ThemeRegistry from '@/components/ThemeRegistry';
import { getAllHeaderImages } from '@/lib/headerImages.server';
import './globals.css';

const lato = Lato({
  variable: '--font-lato',
  subsets: ['latin'],
  weight: ['300', '400', '700'],
});

export const metadata: Metadata = {
  title: {
    default: 'VNNNV — Graphic Design & Photography',
    template: '%s | VNNNV',
  },
  description:
    'Portfolio of a graphic designer and photographer. Product, visual work, and about.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  const images = getAllHeaderImages();

  return (
    <html lang='en' className={lato.variable}>
      <body>
        <ThemeRegistry>
          <div
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <SiteChrome images={images}>{children}</SiteChrome>
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}

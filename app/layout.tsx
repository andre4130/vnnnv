import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ThemeRegistry from '@/components/ThemeRegistry';
import { getAllFooterImages } from '@/lib/footerImages.server';
import { getAllHeaderImages } from '@/lib/headerImages.server';
import './globals.css';
import { useMediaQuery } from '@mui/material';

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
  const footerImages = getAllFooterImages();

  const headerImages = {
    mobile: getAllHeaderImages({ isMobile: true }),
    desktop: getAllHeaderImages({ isMobile: false }),
  };

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
            <Header images={headerImages} />
            <main style={{ flex: 1 }}>{children}</main>
            <Footer images={footerImages} />
          </div>
        </ThemeRegistry>
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import '../styles/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.powerbipro.agency'),
  title: {
    default: 'PowerBI Pro Agency | Power BI Dashboard Experts for USA & EU',
    template: '%s | PowerBI Pro Agency',
  },
  description:
    'We build custom Power BI dashboards for sales, finance, and ecommerce businesses in the USA and EU. Book a free demo today.',
  keywords: [
    'Power BI consultant',
    'Power BI dashboard',
    'Power BI services USA',
    'Power BI developer',
    'business intelligence dashboard',
    'data analytics consultant',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'PowerBI Pro Agency',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@powerbiproagency',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

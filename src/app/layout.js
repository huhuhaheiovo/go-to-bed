import Script from 'next/script';
import './globals.css';

export const metadata = {
  metadataBase: new URL('https://sleeptool.top'),
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-NQW1FR7BEZ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-NQW1FR7BEZ');
          `}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}

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
      <body>{children}</body>
    </html>
  );
}
